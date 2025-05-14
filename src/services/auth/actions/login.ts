import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '@utils/request';
import { AUTH_LOGIN } from '@utils/vars';

export const USER_LOGIN = createAsyncThunk(
	`user/login`,
	async (bodySend: { email: string; password: string }) => {
		const res = await requestApi(AUTH_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodySend),
		});
		return res;
	}
);
