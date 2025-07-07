import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { Order, WebsocketState } from '@utils/types';

const initialState: WebsocketState = {
	orders: null,
	total: 0,
	totalToday: 0,
	wsConnected: false,
};

export const wsSlice = createSlice({
	name: 'wsSlice',
	initialState,
	reducers: {
		wsConnectionClosed(state) {
			state.wsConnected = false;
			state.orders = null;
		},
		wsConnectionFailed(state) {
			state.wsConnected = false;
		},
		wsConnectionStart(_state, _action: PayloadAction<string>) {			
		},
		wsConnectionSuccess(state) {
			state.wsConnected = true;
		},
		wsGetAllOrders(
			state,
			action: PayloadAction<{
				orders: Order[];
				total: number;
				totalToday: number;
			}>
		) {
			const { orders, total, totalToday } = action.payload;
			state.orders = orders;
			state.total = total;
			state.totalToday = totalToday;
		},
	},
});

export const {
	wsConnectionClosed,
	wsConnectionFailed,
	wsConnectionStart,
	wsConnectionSuccess,
	wsGetAllOrders,
} = wsSlice.actions;

export const wsActions = {
	onClose: wsConnectionClosed.type,
	onError: wsConnectionFailed.type,
	onMessage: wsGetAllOrders.type,
	onOpen: wsConnectionSuccess.type,
	wsInit: wsConnectionStart.type,
};

export const getWebsocket = (state: RootState): WebsocketState => state.wsSlice;
