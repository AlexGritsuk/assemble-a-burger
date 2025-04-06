import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '@utils/request';

export const INGREDIENTS_REQEST = createAsyncThunk(
	'INGREDIENTS_REQEST',
	async (URL: string, thunkAPI) => {
		const response = await requestApi(URL, null);
		return response.data;
	}
);
