import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchUser } from '@services/api/profileApi';
import { setError } from '@services/reducers/userSlice';
import { AppDispatch, RootState } from '@services/store';
import { UserError, UserPromise, fetchUpdateUserInput } from '@utils/types';

export const fetchUpdateUser = createAsyncThunk<
	UserPromise,
	fetchUpdateUserInput,
	{
		dispatch: AppDispatch;
		rejectValue: UserError;
		state: RootState;
	}
>('profile/fetchUpdateUser', async (userData, thunkAPI) => {
	try {
		const { email, name, password } = userData;
		return await patchUser({ email, name, password });
	} catch (e) {
		const { dispatch, rejectWithValue } = thunkAPI;
		const hasErrorData = e as UserError;
		setTimeout(() => dispatch(setError(false)), 2000);
		return rejectWithValue(hasErrorData);
	}
});
