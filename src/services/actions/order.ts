import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '@utils/request';

export const ORDER_REQUEST = createAsyncThunk(
	'ORDER_REQUEST',
	async (
		data: { URL: string; bodySend: { ingredients: string[] } },
		thunkAPI
	) => {
		const { URL, bodySend } = data;
		const res = await requestApi(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodySend),
		});
		return res;
	}
);

export const ORDER_RESET = createAction('RESET');
