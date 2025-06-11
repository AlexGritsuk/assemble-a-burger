import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createOrder } from '@services/asyncThunk/createOrder';
import { RootState } from '@services/store';
import { Order, State } from '@utils/types';
import { ERROR_DEFAULT, NOTIFICATION_ORDER_PENDING } from '@utils/vars';

export type OrderState = {
	order: Order | null;
	orderNumber: null | string;
};

const initialState: OrderState & State = {
	error: false,
	errorMessage: false,
	errorMessageContent: ERROR_DEFAULT,
	fetch: false,
	message: false,
	messageContent: NOTIFICATION_ORDER_PENDING,
	order: null,
	orderNumber: null,
};

export const orderSlice = createSlice({
	initialState,
	name: 'order',	
	reducers: {
		setErrorMessage(state, action: PayloadAction<boolean>) {
			state.errorMessage = action.payload;
		},
		setMessage(state, action: PayloadAction<boolean>) {
			state.message = action.payload;
		},
		setOrder(state, action: PayloadAction<Order>) {
			state.order = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.fetch = true;
				state.error = false;
				state.message = false;
				state.errorMessage = false;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				const { order } = action.payload;
				const { number } = order;
				state.order = order;
				state.orderNumber = number.toString();
				state.fetch = false;
				state.message = true;
			})
			.addCase(createOrder.rejected, (state, action) => {
				if (action.payload?.message) {
					state.errorMessage = true;
					state.errorMessageContent = action.payload.message;
				}

				state.fetch = false;
				state.error = true;
			});
	},
});
export const { setErrorMessage, setMessage, setOrder } = orderSlice.actions;

export const selectOrderError = (state: RootState): boolean =>
	state.order.error;

export const selectOrderErrorMessage = (state: RootState): boolean =>
	state.order.errorMessage;

export const selectOrderErrorMessageContent = (state: RootState): string =>
	state.order.errorMessageContent;

export const selectOrderFetchStatus = (state: RootState): boolean =>
	state.order.fetch;

export const selectOrderSuccessStatus = (state: RootState): boolean =>
	state.order.message;

export const selectOrderSuccessContent = (state: RootState): string =>
	state.order.messageContent;

export const selectOrderData = (state: RootState): Order | null =>
	state.order.order;

export const selectOrderNumber = (state: RootState): string | null =>
	state.order.orderNumber;
