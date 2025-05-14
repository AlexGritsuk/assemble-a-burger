import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "@utils/request";
import { AUTH_LOGOUT } from "@utils/vars";


export const USER_LOGOUT = createAsyncThunk(
	`user/logout`,
	async () => {		
		const res = await requestApi(AUTH_LOGOUT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
		return res;
	}
);

