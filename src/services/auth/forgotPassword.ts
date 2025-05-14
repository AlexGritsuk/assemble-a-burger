import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';
import { USER_RESET, USER_RESET_CONFIRM } from './actions/forgotPassword';

export const forgotSlice = createSlice({
	name: 'forgot',
	initialState,
	reducers: {},
	selectors: {
		getForgotIsLiading: (state) => state.status.reset.loading,
		getHasError: (state) => state.status.reset.error,
		getForgotRequestSuccess: (state) => state.status.reset.success,

		getResetConfirmIsLiading: (state) => state.status.reset_confirm.loading,
		getResetConfirmHasError: (state) => state.status.reset_confirm.error,
		getResetConfirmRequestSuccess: (state) =>
			state.status.reset_confirm.success,
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_RESET.pending, (state) => ({
				...state,
				status: {
					...state.status,
					reset: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))
			.addCase(USER_RESET.fulfilled, (state) => ({
				...state,
				status: {
					...state.status,
					reset: {
						loading: false,
						error: false,
						success: true,
					},
				},
			}))
			.addCase(USER_RESET.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					reset: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}))
			.addCase(USER_RESET_CONFIRM.pending, (state) => ({
				...state,
				status: {
					...state.status,
					reset_confirm: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))
			.addCase(USER_RESET_CONFIRM.fulfilled, (state) => ({
				...state,
				status: {
					...state.status,
					reset: {
						loading: false,
						error: false,
						success: false,
					},
					reset_confirm: {
						loading: false,
						error: false,
						success: true,
					},
				},
			}))
			.addCase(USER_RESET_CONFIRM.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					reset_confirm: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}));
	},
});
