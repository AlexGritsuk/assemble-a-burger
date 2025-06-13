import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPassword } from '@services/api/profileApi';
import { showNotificationWithTimeout } from '@services/helpers/showNotificationWithTimeout';
import { setErrorMessage } from '@services/reducers/loginSlice';
import { setMessage } from '@services/reducers/logoutSlice';
import { AppDispatch, RootState } from '@services/store';
import { ResetPasswordInput, ResetPasswordPromise } from '@utils/types';

type KnownErrorData = {
	message: string;
	success: boolean;
};

type ResetPasswordError = {
	data: KnownErrorData;
	ok: boolean;
	status: number;
	statusText: string;
	success: boolean;
	url: string;
	message?: string;
};

export const fetchResetPassword = createAsyncThunk<
	ResetPasswordPromise,
	ResetPasswordInput,
	{
		dispatch: AppDispatch;
		rejectValue: ResetPasswordError;
		state: RootState;
	}
>('profile/fetchResetPassword', async (values, thunkAPI) => {
	try {
		const { dispatch, getState } = thunkAPI;
		const res = await resetPassword({
			password: values.password,
			token: values.token,
		});
		const { password } = getState();
		showNotificationWithTimeout(
			password.resetPasswordRequest.messageContent,
			dispatch,
			setMessage
		);
		return res;
	} catch (e) {
		const { dispatch, rejectWithValue } = thunkAPI;
		const hasErrorData = e as ResetPasswordError;
		dispatch(setErrorMessage(true));
		setTimeout(() => {
			dispatch(setErrorMessage(false));
		}, 4000);
		return rejectWithValue(hasErrorData);
	}
});
