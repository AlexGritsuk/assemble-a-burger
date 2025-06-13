import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchForgotPassword } from '@services/asyncThunk/fetchForgotPassword';
import { fetchResetPassword } from '@services/asyncThunk/fetchResetPassword';
import { RootState } from '@services/store';
import { State } from '@utils/types';
import {
	ERROR_DEFAULT,
	NOTIFICATION_EMAIL_SUBMITTED,
	NOTIFICATION_INCORRECT_TOKEN,
	NOTIFICATION_PASSWORD_RESET,
	SERVER_RESPOND_INCORRECT_TOKEN,
} from '@utils/vars';

export interface PasswordState {
	forgotPasswordRequest: State;
	isEmailSubmitted: boolean;
	isPasswordChanged: boolean;
	resetPasswordRequest: State;
}

const initialState: PasswordState = {
	forgotPasswordRequest: {
		error: false,
		errorMessage: false,
		errorMessageContent: ERROR_DEFAULT,
		fetch: false,
		message: false,
		messageContent: NOTIFICATION_EMAIL_SUBMITTED,
	},
	isEmailSubmitted: false,
	isPasswordChanged: false,
	resetPasswordRequest: {
		error: false,
		errorMessage: false,
		errorMessageContent: ERROR_DEFAULT,
		fetch: false,
		message: false,
		messageContent: NOTIFICATION_PASSWORD_RESET,
	},
};

export const passwordSlice = createSlice({
	name: 'password',
	initialState,
	reducers: {
		setErrorMessage(state, action: PayloadAction<boolean>) {
			state.forgotPasswordRequest.errorMessage = action.payload;
			state.resetPasswordRequest.errorMessage = action.payload;
		},
		setIsEmailSubmitted(state, action: PayloadAction<boolean>) {
			state.isEmailSubmitted = action.payload;
		},
		setIsPasswordChanged(state, action: PayloadAction<boolean>) {
			state.isPasswordChanged = action.payload;
		},
		setMessage(state, action: PayloadAction<boolean>) {
			state.forgotPasswordRequest.message = action.payload;
			state.resetPasswordRequest.message = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchForgotPassword.pending, (state) => {
				state.isEmailSubmitted = false;
				state.forgotPasswordRequest = {
					...initialState.forgotPasswordRequest,
					fetch: true,
				};
			})
			.addCase(fetchForgotPassword.fulfilled, (state) => {
				state.isEmailSubmitted = true;
				state.forgotPasswordRequest = {
					...state.forgotPasswordRequest,
					fetch: false,
					message: true,
				};
			})
			.addCase(fetchForgotPassword.rejected, (state, action) => {
				state.isEmailSubmitted = false;

				if ('payload' in action && action.payload?.message) {
					state.forgotPasswordRequest.error = true;
					state.forgotPasswordRequest.errorMessage = true;
					state.forgotPasswordRequest.errorMessageContent =
						action.payload.message ?? ERROR_DEFAULT;
				} else if (action.error?.message) {
					state.forgotPasswordRequest.error = true;
					state.forgotPasswordRequest.errorMessage = true;
					state.forgotPasswordRequest.errorMessageContent =
						action.error.message ?? ERROR_DEFAULT;
				} else {
					console.error('Ошибка при восстановлении пароля', action);
				}
				state.forgotPasswordRequest.fetch = false;
			});

		builder
			.addCase(fetchResetPassword.pending, (state) => {
				state.isPasswordChanged = false;
				state.resetPasswordRequest = {
					...initialState.resetPasswordRequest,
					fetch: true,
				};
			})
			.addCase(fetchResetPassword.fulfilled, (state) => {
				state.isPasswordChanged = true;
				state.isEmailSubmitted = false;
				state.resetPasswordRequest = {
					...state.resetPasswordRequest,
					fetch: false,
					message: true,
				};
			})
			.addCase(fetchResetPassword.rejected, (state, action) => {
				state.isPasswordChanged = false;

				if ('payload' in action && action.payload?.message) {
					const { message } = action.payload;

					if (message === SERVER_RESPOND_INCORRECT_TOKEN) {
						state.resetPasswordRequest.errorMessageContent =
							NOTIFICATION_INCORRECT_TOKEN;
					} else {
						state.resetPasswordRequest.errorMessageContent =
							message || ERROR_DEFAULT;
					}
					state.resetPasswordRequest.error = true;
					state.resetPasswordRequest.errorMessage = true;
				} else if (action.error?.message) {
					if (action.error.message === SERVER_RESPOND_INCORRECT_TOKEN) {
						state.resetPasswordRequest.errorMessageContent =
							NOTIFICATION_INCORRECT_TOKEN;
					} else {
						state.resetPasswordRequest.errorMessageContent =
							action.error.message || ERROR_DEFAULT;
					}

					state.resetPasswordRequest.error = true;
					state.resetPasswordRequest.errorMessage = true;
				} else {
					console.error('Ошибка при сбросе пароля', action);
				}

				state.resetPasswordRequest.fetch = false;
			});
	},
});

export const { setErrorMessage, setMessage } = passwordSlice.actions;

export const selectForgotPasswordRequest = (state: RootState) =>
	state.password.forgotPasswordRequest;

export const selectIsEmailSubmitted = (state: RootState) =>
	state.password.isEmailSubmitted;

export const selectIsPasswordChanged = (state: RootState) =>
	state.password.isPasswordChanged;

export const selectResetPassowordRequest = (state: RootState) =>
	state.password.resetPasswordRequest;
