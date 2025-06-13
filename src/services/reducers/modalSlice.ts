import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { Order, OrderPromise, TIngredients } from '@utils/types';

export interface ModalState {
	modalIngredient: TIngredients | null;
	modalNotification: null | string;
	modalOrder: Order | null;
	modalOrderSuccess: OrderPromise | null;
}

const initialState: ModalState = {
	modalIngredient: null,
	modalNotification: null,
	modalOrder: null,
	modalOrderSuccess: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,	
	reducers: {
		setModalIngredient(state, action: PayloadAction<TIngredients>) {
			state.modalIngredient = action.payload;
		},
		setModalNotification(state, action: PayloadAction<string>) {
			state.modalNotification = action.payload;
		},
		setModalOrder(state, action: PayloadAction<Order>) {
			state.modalOrder = action.payload;
		},
		setModalOrderSuccess(state, action: PayloadAction<OrderPromise>) {
			state.modalOrderSuccess = action.payload;
		},
		closeModal(state) {
			state.modalIngredient = null;
			state.modalNotification = null;
			state.modalOrder = null;
			state.modalOrderSuccess = null;
		},
	},
});

export const getModalIngredient = (state: RootState) =>
	state.modal.modalIngredient;
export const getModalNotification = (state: RootState) =>
	state.modal.modalNotification;
export const getModalOrder = (state: RootState) => state.modal.modalOrder;
export const getModalOrderSuccess = (state: RootState) =>
	state.modal.modalOrderSuccess;

export const {
	setModalIngredient,
	setModalNotification,
	setModalOrder,
	setModalOrderSuccess,
	closeModal,
} = modalSlice.actions;
