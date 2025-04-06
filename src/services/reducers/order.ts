import { createSlice } from '@reduxjs/toolkit';
import { ORDER_REQUEST, ORDER_RESET } from '@services/actions/order';

const initialState = {
	item: {
		status: '',
		name: '',
		order: {
			number: '',
		},
	},
	status: {
		loading: false,
		error: false,
		success: false,
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	selectors: {
		getOrderDetails: (state) => state.item,
		getOrderNumber: (state) => state.item.order.number,

		getOrderLoading: (state) => state.status.loading,
		getOrderError: (state) => state.status.error,
		gerOrderSuccess: (state) => state.status.success,
	},
	extraReducers: (builder) => {
		builder
			.addCase(ORDER_REQUEST.pending, (state) => ({
				...state,
				status: {
					loading: true,
					error: false,
					success: false,
				},
			}))
			.addCase(ORDER_REQUEST.fulfilled, (state, action) => ({
				item: action.payload,
				status: {
					loading: false,
					error: false,
					success: true,
				},
			}))
			.addCase(ORDER_REQUEST.rejected, (state) => ({
				...state,
				status: {
					loading: false,
					error: true,
					success: false,
				},
			}))
			.addCase(ORDER_RESET, () => initialState)
			.addDefaultCase((state) => state);
	},
});
