import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder, postOrder } from "@services/api/orderApi";
import { setErrorMessage } from "@services/reducers/loginSlice";
import { setMessage } from "@services/reducers/logoutSlice";
import { closeModal, modalSlice, setModalNotification, setModalOrderSuccess } from "@services/reducers/modalSlice";
import { setOrder } from "@services/reducers/orderSlice";
import { AppDispatch, RootState } from "@services/store";
import { Cart, GetOrdersPromise, OrderPromise } from "@utils/types";

type OrderError = {
	message: string;
};

export const createOrder = createAsyncThunk<
	OrderPromise,
	Cart,
	{
		dispatch: AppDispatch;
		rejectValue: OrderError;
		state: RootState;
	}
>('order/createOrder', async (cart, thunkAPI) => {
	try {
		const { dispatch, getState } = thunkAPI;
		const bunId = cart.bun._id;
		const ingredientsIdsArray = cart.ingredients.map((item) => item._id);
		const idsArray = [bunId, ...ingredientsIdsArray, bunId];
		dispatch(setMessage(true));
		const { order } = getState();
		dispatch(setModalNotification(order.messageContent));
		setTimeout(() => {
			dispatch(setMessage(false));
			dispatch(closeModal());
		}, 14000);
		const res = await postOrder({ ingredients: idsArray });
		dispatch(setModalOrderSuccess(res));
		// dispatch(cleanCart());
		return res;
	} catch (e) {
		const { dispatch, getState, rejectWithValue } = thunkAPI;
		const hasErrorData = e as OrderError;
		dispatch(setErrorMessage(true));
		const { order } = getState();
		dispatch(setModalNotification(order.errorMessageContent));
		setTimeout(() => {
			dispatch(setErrorMessage(false));
			dispatch(closeModal());
		}, 4000);
		return rejectWithValue(hasErrorData);
	}
});

export const fetchGetOrder = createAsyncThunk<
	GetOrdersPromise,
	number,
	{
		dispatch: AppDispatch;
		rejectValue: OrderError;
		state: RootState;
	}
>('order/getOrder', async (orderNumber, thunkAPI) => {
	try {
		const { dispatch } = thunkAPI;
		const res = await getOrder({ orderNumber });
		const { orders } = res;
		dispatch(setOrder(orders[0]));
		return res;
	} catch (e) {
		const { rejectWithValue } = thunkAPI;
		const hasErrorData = e as OrderError;
		return rejectWithValue(hasErrorData);
	}
});
