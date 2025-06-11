import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '@services/api/profileApi';
import { resetAllCookie } from '@services/helpers/resetAllCookie';
import { showNotificationWithTimeout } from '@services/helpers/showNotificationWithTimeout';
import { setMessage } from '@services/reducers/logoutSlice';
import { updateUser } from '@services/reducers/userSlice';
import { AppDispatch, RootState } from '@services/store';
import { LogoutInput, LogoutPromise } from '@utils/types';

interface LogoutError {
	message: string;
	success: boolean;
}

export const fetchLogout = createAsyncThunk<
	LogoutPromise,
	LogoutInput,
	{
		dispatch: AppDispatch;
		rejectValue: LogoutError;
		state: RootState;
	}
>('profile/fetchLogout', async ({ token }, thunkAPI) => {
	try {
		const { dispatch, getState } = thunkAPI;
		const res = await logoutUser({ token });
		dispatch(
			updateUser({
				email: '',
				isLogin: false,
				isLogout: true,
				name: '',
				token: { accessToken: null, expiresAt: null, refreshToken: null },
			})
		);
		resetAllCookie();
		const { logout } = getState();
		showNotificationWithTimeout(logout.messageContent, dispatch, setMessage);
		return res;
	} catch (e: unknown) {
		const { rejectWithValue } = thunkAPI;
		const hasErrorData = e as LogoutError;
		return rejectWithValue(hasErrorData);
	}
});
