import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '@utils/request';
import { AUTH_REGISTER } from '@utils/vars';

export const USER_REGISTER = createAsyncThunk(
	`user/register`,
	async (bodySend: { email: string; password: string; name: string }) => {
		const res = await requestApi(AUTH_REGISTER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodySend),
		});
		return res;
	}
);
