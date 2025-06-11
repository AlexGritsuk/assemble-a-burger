import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchGetUser } from '@services/asyncThunk/fetchGetUser';
import { fetchUpdateUser } from '@services/asyncThunk/fetchUpdateUser';
import { getCookie } from '@services/helpers/getCookie';
import { RootState } from '@services/store';
import { State, Token } from '@utils/types';
import {
	ACCESS_TOKEN,
	ERROR_DEFAULT,
	ERROR_USER_EXISTS,
	EXPIRES_AT,
	NOTIFICATION_LOGIN_SUCCESS,
	NOTIFICATION_USER_UPDATE_ERROR,
	NOTIFICATION_USER_UPDATE_SUCCESS,
	REFRESH_TOKEN,
} from '@utils/vars';

export type UserState = {
	getUserRequest: State;
	patchUserRequest: State;
	user: {
		email: string;
		isLogin: boolean;
		isLogout: boolean;
		name: string;
		token: Token;
	};
};

const initialState: UserState = {
	getUserRequest: {
		error: false,
		errorMessage: false,
		errorMessageContent: ERROR_DEFAULT,
		fetch: false,
		message: false,
		messageContent: NOTIFICATION_LOGIN_SUCCESS,
	},
	patchUserRequest: {
		error: false,
		errorMessage: false,
		errorMessageContent: NOTIFICATION_USER_UPDATE_ERROR,
		fetch: false,
		message: false,
		messageContent: NOTIFICATION_USER_UPDATE_SUCCESS,
	},
	user: {
		email: '',
		isLogin: !!getCookie(ACCESS_TOKEN),
		isLogout: false,
		name: '',
		token: {
			accessToken: getCookie(ACCESS_TOKEN) ?? null,
			expiresAt: getCookie(EXPIRES_AT) ?? null,
			refreshToken: getCookie(REFRESH_TOKEN) ?? null,
		},
	},
};

const updateRequestState = (
	statePart: State,
	updates?: Partial<State>
): State => ({
	...statePart,
	...updates,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<boolean>) {
			state.patchUserRequest.error = action.payload;			
			if (!action.payload) {
				state.patchUserRequest.errorMessageContent = '';
			}
		},
		updateUser(
			state,
			action: PayloadAction<{
				email?: string;
				isLogin?: boolean;
				isLogout?: boolean;
				name?: string;
				token?: Token;
			}>
		) {
			state.user = { ...state.user, ...action.payload };
		},
	},
	extraReducers(builder) {
		builder
			
			.addCase(fetchGetUser.pending, (state) => {
				state.getUserRequest = updateRequestState(state.getUserRequest, {
					fetch: true,
				});
			})
			.addCase(fetchGetUser.fulfilled, (state, action) => {
				const { user } = action.payload;
				const { email, name } = user;

				state.getUserRequest = updateRequestState(state.getUserRequest, {
					fetch: false,
				});
				state.user = { ...state.user, email, name, isLogin: true };
			})
			.addCase(fetchGetUser.rejected, (state, action) => {
				const payload = action.payload as { message?: string } | undefined;

				if (payload && 'message' in payload) {
					state.getUserRequest = updateRequestState(state.getUserRequest, {
						error: true,
						errorMessageContent: payload.message || ERROR_DEFAULT,
						fetch: false,
					});					
					state.user.isLogin = false;
				} else {
					console.error('fetchGetUser rejected без payload');
				}
			})
			
			.addCase(fetchUpdateUser.pending, (state) => {
				state.patchUserRequest = updateRequestState(state.patchUserRequest, {
					fetch: true,
				});
			})
			.addCase(fetchUpdateUser.fulfilled, (state, action) => {
				const { user } = action.payload;
				const { email, name } = user;

				state.patchUserRequest = updateRequestState(state.patchUserRequest, {
					fetch: false,
					message: true,
				});
				
				state.user = { ...state.user, email, name, isLogin: true };
			})
			.addCase(fetchUpdateUser.rejected, (state, action) => {
				const payload = action.payload as { message?: string } | undefined;

				if (payload && 'message' in payload) {
					const message = payload.message || '';
					state.patchUserRequest = updateRequestState(state.patchUserRequest, {
						error: true,
						errorMessage: true,
						fetch: false,
					});

					if (message === 'User with such email already exists') {
						state.patchUserRequest.errorMessageContent = ERROR_USER_EXISTS;
					} else {
						state.patchUserRequest.errorMessageContent =
							message || NOTIFICATION_USER_UPDATE_ERROR;
					}
				} else {
					console.error('fetchUpdateUser rejected без payload');
				}
			});
	},
});

export const selectGetUser = (state: RootState) => state.user.user;
export const selectPatchUserRequest = (state: RootState) =>
	state.user.patchUserRequest;
export const selectUserRequest = (state: RootState) =>
	state.user.patchUserRequest;

export const { setError, updateUser } = userSlice.actions;
