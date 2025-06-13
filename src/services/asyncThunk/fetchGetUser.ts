import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '@services/api/profileApi';
import { updateUser } from '@services/reducers/userSlice';
import { AppDispatch, RootState } from '@services/store';
import { UserError, UserPromise } from '@utils/types';

export const fetchGetUser = createAsyncThunk<
	UserPromise,
	void,
	{
		dispatch: AppDispatch;
		rejectValue: UserError;
		state: RootState;
	}
>('profile/fetchGetUser', async (_, thunkAPI) => {
	try {
		const { dispatch } = thunkAPI;
		const res = await getUser();
		const { user } = res;
		dispatch(
			updateUser({
				email: user.email,
				isLogin: true,
				name: user.name,
			})
		);
		return res;
	} catch (e: unknown) {
		const { rejectWithValue } = thunkAPI;
		const hasErrorData = e as UserError;
		return rejectWithValue(hasErrorData);
	}
});
