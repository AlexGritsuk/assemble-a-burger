import { initialState } from './initialState';
import { createSlice } from '@reduxjs/toolkit';
import { USER_CHECKED } from './actions/checkAuth';

export const checkAuthSlice = createSlice({
	name: 'checkAuth',
	initialState,
	reducers: {},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,		
	},
	extraReducers: (builder) => {
		builder.addCase(USER_CHECKED, (state) => ({
			...state,
			isAuthChecked: true,
		}));
	},
});
