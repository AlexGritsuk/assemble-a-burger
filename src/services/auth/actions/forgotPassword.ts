import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '@utils/request';
import { AUTH_RESET, AUTH_RESET_CONFIRM } from '@utils/vars';

export const USER_RESET = createAsyncThunk(
	'user/reset',
	async (bodySend: { email: string }) => {
		const res = await requestApi(AUTH_RESET, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodySend),
		});
		return res;
	}
);


export const USER_RESET_CONFIRM = createAsyncThunk(
	`$user/reset_confirm`,
	async (bodySend: { password: string; token: string }) => {
		
		const response = await requestApi(AUTH_RESET_CONFIRM, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodySend),
		});
		return response;
	}
);
