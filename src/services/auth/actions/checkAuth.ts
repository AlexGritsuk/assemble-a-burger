import {	
	createAction,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { fetchWithRefresh } from '@utils/request';
import { AUTH_USER } from '@utils/vars';

export const USER_CHECK_AUTH = () => { 
	return (dispatch: any) => {
		if (
			localStorage.getItem('accessToken') &&
			localStorage.getItem('accessToken') !== 'undefined'
		) {
			dispatch(USER_GET_INFO());
		} else {
			dispatch(USER_CHECKED());
		}
	};
};

export const USER_CHECKED = createAction(`user/user_checked`);


export const USER_GET_INFO = createAsyncThunk(
	`user/get_info`,
	async () => {		
		const response = await fetchWithRefresh(AUTH_USER, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: localStorage.getItem('accessToken'),
			},
		});
		return response;
	}
);
