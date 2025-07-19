import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchRegister } from '@services/asyncThunk/fetchRegister';
import { RootState } from '@services/store';
import { State } from '@utils/types';
import {
	ERROR_DEFAULT,
	ERROR_USER_EXISTS,
	NOTIFICATION_USER_CREATED,
	SERVER_RESPOND_USER_EXISTS,
} from '@utils/vars';

const initialState: State = {
	error: false,
	errorMessage: false,
	errorMessageContent: ERROR_DEFAULT,
	fetch: false,
	message: false,
	messageContent: NOTIFICATION_USER_CREATED,
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
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
			.addCase(fetchRegister.pending, (state) => {
				state.fetch = true;
				state.error = false;
				state.message = false;
				state.errorMessage = false;
			})
			.addCase(fetchRegister.fulfilled, (state) => {
				state.fetch = false;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.fetch = false;

				if (action.payload && 'data' in action.payload) {
					const { data } = action.payload as { data?: { message?: string } };
					const message = data?.message;

					state.error = true;
					state.errorMessage = true;

					if (message && message === SERVER_RESPOND_USER_EXISTS) {
						state.errorMessageContent = ERROR_USER_EXISTS;
					} else {
						state.errorMessageContent = message || ERROR_DEFAULT;
					}
				} else {
					console.error('Ошибка по умолчанию', action.error);
					state.error = true;
					state.errorMessageContent = ERROR_DEFAULT;
				}
			});
	},
});

export const { setErrorMessage, setMessage } = registerSlice.actions;

export const selectRegisterError = (state: RootState) => state.register.error;
export const selectRegisterErrorMessage = (state: RootState) =>
	state.register.errorMessage;
export const selectRegisterErrorMessageContent = (state: RootState) =>
	state.register.errorMessageContent;
export const selectRegisterFetch = (state: RootState) => state.register.fetch;
export const selectRegisterMessage = (state: RootState) =>
	state.register.message;
export const selectRegisterMessageContent = (state: RootState) =>
	state.register.messageContent;

	export default registerSlice.reducer;