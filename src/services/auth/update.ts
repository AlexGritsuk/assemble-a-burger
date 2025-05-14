import { USER_UPDATE } from './actions/update';
import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';

export const updateSlice = createSlice({
	name: 'update',
	initialState,
	reducers: {},
	selectors: {
		getUpdateIsLoading: (state) => state.status.update.loading,
		getUpdateHasError: (state) => state.status.update.error,
		getUpdateSuccess: (state) => state.status.update.success,
	},
	extraReducers: (builder) => {
		builder
			.addCase(USER_UPDATE.pending, (state) => ({
				...state,
				status: {
					...state.status,
					update: {
						loading: true,
						error: false,
						success: false,
					},
				},
			}))

			.addCase(USER_UPDATE.fulfilled, (state, action) => ({
				...state,
				user: action.payload.user,
				status: {
					...state.status,
					update: {
						loading: false,
						error: false,
						success: true,
					},
				},
			}))
			.addCase(USER_UPDATE.rejected, (state) => ({
				...state,
				status: {
					...state.status,
					update: {
						loading: false,
						error: true,
						success: false,
					},
				},
			}));
	},
});
