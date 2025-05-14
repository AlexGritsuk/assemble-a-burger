import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '@utils/request';
import { AUTH_USER } from '@utils/vars';

export const USER_GET_INFO = createAsyncThunk(`$user/get_info`, async () => {
	const res = await fetchWithRefresh(AUTH_USER, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
	});
	return res;
});
