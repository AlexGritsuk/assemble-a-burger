import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '@utils/request';
import { AUTH_USER } from '@utils/vars';

export const USER_UPDATE = createAsyncThunk(
	'user/update',
	async (bodySend: { name: string; email: string; password: string }) => {
		const token = localStorage.getItem('accessToken');

		if (!token) {
			throw new Error('Нет токена доступа');
		}

		const res = await fetchWithRefresh(AUTH_USER, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(bodySend),
		});

		return res;
	}
);
