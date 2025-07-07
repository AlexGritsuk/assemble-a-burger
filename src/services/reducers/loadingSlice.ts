import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
	loading: boolean;
}

const initialState: LoadingState = {
	loading: false,
};

export const loadingSlice = createSlice({
	initialState,
	name: 'loading',	
	reducers: {
		setLoading(state, action: PayloadAction<{ loading: boolean }>) { 
			state.loading = action.payload.loading;
		},
	},
});

export const selectLoading = (state: { loading: LoadingState }) =>
	state.loading.loading;

export const { setLoading } = loadingSlice.actions;
