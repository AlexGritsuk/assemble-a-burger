import { USER_GET_INFO } from './actions/checkAuth';
import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {},
	selectors: {
		getUser: (state) => state.user,
		getUserName: (state) => {
			if (state.user) {
				return state.user.name;
			}
		},
		getUserEmail: (state) => {
			if (state.user) {
				return state.user.email;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_GET_INFO.pending, (state) => ({
				...state,
				status: {
					...state.status,
					get_info: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))
			.addCase(USER_GET_INFO.fulfilled, (state, action) => ({
				user: action.payload.user,
				isAuthChecked: true,
				status: {
					...state.status,
					get_info: {
						loading: false,
						error: false,
						success: true,
					},
				},
			}))
			.addCase(USER_GET_INFO.rejected, (state) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				return {
					...state,
					user: initialState.user,
					status: {
						...state.status,
						get_info: {
							loading: false,
							error: true,
							success: false,
						},
					},
				};
			})
			
	},
});
