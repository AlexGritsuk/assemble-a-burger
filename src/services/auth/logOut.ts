import { USER_LOGOUT } from './actions/logOut';
import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {},
	selectors: {
		getLogOutIsLiading: (state) => state.status.logout.loading,
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_LOGOUT.pending, (state) => ({
				...state,
				status: {
					...state.status,
					logout: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))

			.addCase(USER_LOGOUT.fulfilled, (state, action) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				return {
					...state,
					user: initialState.user,
					status: {
						...state.status,
						logout: {
							loading: false,
							error: false,
							success: true,
						},
					},
				};
			})

			.addCase(USER_LOGOUT.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					logout: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}));
	},
});
