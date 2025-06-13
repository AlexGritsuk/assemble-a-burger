import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword } from "@services/api/profileApi";
import { showNotificationWithTimeout } from "@services/helpers/showNotificationWithTimeout";
import { setMessage } from "@services/reducers/logoutSlice";
import { AppDispatch, RootState } from "@services/store";
import { ForgotPasswordInput, ForgotPasswordPromise } from "@utils/types";

type ForgotPasswordError = {
	[key: string]: unknown;
	message: string;
};

export const fetchForgotPassword = createAsyncThunk<
	ForgotPasswordPromise,
	ForgotPasswordInput,
	{
		dispatch: AppDispatch;
		rejectValue: ForgotPasswordError;
		state: RootState;
	}
>('profile/fetchForgotPassword', async ({ email }, thunkAPI) => {
	try {
		const { dispatch, getState } = thunkAPI;
		const { password } = getState();
		const res = await forgotPassword({ email });
		showNotificationWithTimeout(
			password.forgotPasswordRequest.messageContent,
			dispatch,
			setMessage
		);
		return res;
	} catch (e) {
		const { rejectWithValue } = thunkAPI;
		const hasErrorData = e as ForgotPasswordError;
		return rejectWithValue(hasErrorData);
	}
});
