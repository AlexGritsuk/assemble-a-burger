import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '@services/api/profileApi';
import { changeUserLoginInfo } from '@services/helpers/checkUserLoginInfo';
import { showNotificationWithTimeout } from '@services/helpers/showNotificationWithTimeout';
import { setErrorMessage, setMessage } from '@services/reducers/loginSlice';
import { AppDispatch, RootState } from '@services/store';
import { LoginInput, LoginPromise } from '@utils/types';

type KnownErrorData = {
	message: string;
	success: boolean;
};

type LoginError = {
	data: KnownErrorData;
	ok: boolean;
	status: number;
	statusText: string;
	success: boolean;
	url: string;
};

export const fetchLogin = createAsyncThunk<
	LoginPromise,
	LoginInput,
	{
		dispatch: AppDispatch;
		rejectValue: LoginError;
		state: RootState;
	}
>('profile/fetchLogin', async (userData, thunkAPI) => {
	try {
		const { dispatch, getState } = thunkAPI;
		const { email, password } = userData;
		const res = await loginUser({ email, password });
		const { accessToken, refreshToken, user } = res;
		changeUserLoginInfo(user, accessToken, refreshToken, dispatch);
		const { login } = getState();
		showNotificationWithTimeout(login.messageContent, dispatch, setMessage);
		return res;
	} catch (e) {
		const { dispatch, rejectWithValue } = thunkAPI;
		const hasErrorData = e as LoginError;
		dispatch(setErrorMessage(true));
		setTimeout(() => {
			dispatch(setErrorMessage(false));
		}, 4000);
		return rejectWithValue(hasErrorData);
	}
});
