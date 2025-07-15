import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '@services/asyncThunk/fetchLogin';
import { RootState } from '@services/store';
import { State } from '@utils/types';
import {
	ERROR_DEFAULT,
	ERROR_LOGIN,
	NOTIFICATION_LOGIN_SUCCESS,
	SERVER_RESPOND_INCORRECT_VALUES,
} from '@utils/vars';

const initialState: State = {
	error: false,
	errorMessage: false,
	errorMessageContent: ERROR_DEFAULT,
	fetch: false,
	message: false,
	messageContent: NOTIFICATION_LOGIN_SUCCESS,
};

export const loginSlice = createSlice({
	initialState,
	name: 'login',
	reducers: {
		setErrorMessage(state, action: PayloadAction<boolean>) {
			state.errorMessage = action.payload;
		},
		setMessage(state, action: PayloadAction<boolean>) {
			state.message = action.payload;
		},
	}, 
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.pending, (state) => {
				state.fetch = true;
				state.error = false;
				state.message = false;
				state.errorMessage = false;
			})
			.addCase(fetchLogin.fulfilled, (state) => {
				state.fetch = false;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				if (action.payload && 'data' in action.payload) {
					const { data } = action.payload;
					const { message } = data;
					state.errorMessage = true;
					state.errorMessageContent =
						message && message === SERVER_RESPOND_INCORRECT_VALUES
							? (state.errorMessageContent = ERROR_LOGIN)
							: (state.errorMessageContent = message || ERROR_DEFAULT);
					state.fetch = false;
					state.error = true;
				} else {
					console.error('action.payload is undefined');
				}
			});
	},
});

export const { setErrorMessage, setMessage } = loginSlice.actions;

export const selectLoginError = (state: RootState) => state.login.error;

export const selectLoginErrorMessage = (state: RootState) =>
	state.login.errorMessage;

export const selectLoginErrorMessageContent = (state: RootState) =>
	state.login.errorMessageContent;

export const selectLoginFetchStatus = (state: RootState) => state.login.fetch;

export const selectLoginMessageStatus = (state: RootState) =>
	state.login.message;

export const selectLoginMessageContent = (state: RootState) =>
	state.login.messageContent;
