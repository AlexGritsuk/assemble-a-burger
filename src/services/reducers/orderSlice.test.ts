import { Order } from '@utils/types';
import {
	orderSlice,
	setErrorMessage,
	setMessage,
	setOrder,
} from './orderSlice';
import { createOrder } from '@services/asyncThunk/createOrder';

describe('orderSlice', () => {
	const initialState = orderSlice.getInitialState();

	it('должен правильно обрабатывать setErrorMessage', () => {
		const newState = orderSlice.reducer(initialState, setErrorMessage(true));
		expect(newState.errorMessage).toBe(true);
	});

	it('должен правильно обрабатывать setMessage', () => {
		const newState = orderSlice.reducer(initialState, setMessage(true));
		expect(newState.message).toBe(true);
	});

	it('должен правильно обрабатывать setOrder', () => {
		// Создаем mockOrder, соответствующий интерфейсу Order
		const mockOrder: Order = {
			_id: 'abc123',
			createdAt: '2024-04-27T12:00:00Z',
			ingredients: ['ingredient1', 'ingredient2'],
			name: 'Test Order',
			number: 42,
			status: 'created',
			updatedAt: '2024-04-27T12:00:00Z',
		};

		// Вызываем редьюсер с действием setOrder
		const newState = orderSlice.reducer(initialState, setOrder(mockOrder));

		// Проверяем, что состояние обновилось правильно
		expect(newState.order).toEqual(mockOrder);
	});

	it('обработка createOrder.pending', () => {
		const action = { type: createOrder.pending.type };
		const newState = orderSlice.reducer(initialState, action);
		expect(newState.fetch).toBe(true);
		expect(newState.error).toBe(false);
		expect(newState.message).toBe(false);
		expect(newState.errorMessage).toBe(false);
	});

	it('обработка createOrder.fulfilled', () => {
		const mockOrder = { number: 456, items: [] };
		const action = {
			type: createOrder.fulfilled.type,
			payload: { order: mockOrder },
		};
		const newState = orderSlice.reducer(initialState, action);
		expect(newState.order).toEqual(mockOrder);
		expect(newState.orderNumber).toBe(mockOrder.number.toString());
		expect(newState.fetch).toBe(false);
		expect(newState.message).toBe(true);
	});

	it('обработка createOrder.rejected с payload.message', () => {
		const action = {
			type: createOrder.rejected.type,
			payload: { message: 'Ошибка' },
			error: {},
		};
		const newState = orderSlice.reducer(initialState, action);
		expect(newState.error).toBe(true);
		expect(newState.errorMessageContent).toBe('Ошибка');
	});
});
