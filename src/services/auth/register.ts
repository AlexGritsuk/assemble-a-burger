import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';
import { USER_REGISTER } from './actions/register';

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	selectors: {
		getForgotIsLiading: (state) => state.status.register.loading,
		getHasError: (state) => state.status.register.error,
		getForgotRequestSuccess: (state) => state.status.register.success,
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_REGISTER.pending, (state) => ({
				...state,
				status: {
					...state.status,
					register: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))
			.addCase(USER_REGISTER.fulfilled, (state, action) => {
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
				return {
					user: action.payload.user,
					isAuthChecked: true,
					status: {
						...state.status,
						register: {
							loading: false,
							error: false,
							success: true,
						},
					},
				};
			})
			.addCase(USER_REGISTER.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					register: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}));
	},
});
