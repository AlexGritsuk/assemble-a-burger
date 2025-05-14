import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';
import { USER_LOGIN } from './actions/login';

export const loginSlice = createSlice({ 
	name: 'login',
	initialState,
	reducers: {},
	selectors: {
		getLoginIsLiading: (state) => state.status.login.loading,
		getLoginHasError: (state) => state.status.login.error,
		getLoginRequestSuccess: (state) => state.status.login.success,
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_LOGIN.pending, (state) => ({
				...state,
				status: {
					...state.status,
					login: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))
			.addCase(USER_LOGIN.fulfilled, (state, action) => {
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
				return {
					user: action.payload.user,
					isAuthChecked: true,
					status: {
						...state.status,
						login: {
							loading: true,
							error: false,
							success: true,
						},
					},
				};
			})
			.addCase(USER_LOGIN.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					login: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}));
	},
});
