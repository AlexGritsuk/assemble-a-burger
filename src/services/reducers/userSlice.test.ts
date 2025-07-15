import { fetchUpdateUser } from '@services/asyncThunk/fetchUpdateUser';
import reducer, { initialState } from './userSlice';
import {
	fetchGetUser,	
} from '@services/asyncThunk/fetchGetUser';
import { ERROR_USER_EXISTS } from '@utils/vars';


describe('userSlice reducer', () => {
	it('обрабатывает fetchGetUser.pending', () => {
		const action = { type: fetchGetUser.pending.type };
		const state = reducer(initialState, action);
		expect(state.getUserRequest.fetch).toBe(true);
	});

	it('обрабатывает fetchGetUser.fulfilled', () => {
		const mockPayload = {
			user: { email: 'test@example.com', name: 'Test User' },
		};
		const action = { type: fetchGetUser.fulfilled.type, payload: mockPayload };
		const state = reducer(initialState, action);
		expect(state.getUserRequest.fetch).toBe(false);
		expect(state.user.email).toBe('test@example.com');
		expect(state.user.name).toBe('Test User');
		expect(state.user.isLogin).toBe(true);
	});

	it('обрабатывает fetchGetUser.rejected с сообщением', () => {
		const errorPayload = { message: 'Ошибка получения пользователя' };
		const action = { type: fetchGetUser.rejected.type, payload: errorPayload };
		const state = reducer(initialState, action);
		expect(state.getUserRequest.error).toBe(true);
		expect(state.getUserRequest.errorMessageContent).toBe(
			'Ошибка получения пользователя'
		);
		expect(state.user.isLogin).toBe(false);
	});

	it('обрабатывает fetchUpdateUser.pending', () => {
		const action = { type: fetchUpdateUser.pending.type };
		const state = reducer(initialState, action);
		expect(state.patchUserRequest.fetch).toBe(true);
	});

	it('обрабатывает fetchUpdateUser.fulfilled', () => {
		const mockPayload = {
			user: { email: 'new@example.com', name: 'New Name' },
		};
		const action = {
			type: fetchUpdateUser.fulfilled.type,
			payload: mockPayload,
		};
		const state = reducer(initialState, action);
		expect(state.patchUserRequest.fetch).toBe(false);
		expect(state.patchUserRequest.message).toBe(true);
		expect(state.user.email).toBe('new@example.com');
		expect(state.user.name).toBe('New Name');
	});

	it('обрабатывает fetchUpdateUser.rejected с сообщением "User with such email already exists"', () => {
		const errorPayload = { message: 'User with such email already exists' };
		const action = {
			type: fetchUpdateUser.rejected.type,
			payload: errorPayload,
		};
		const state = reducer(initialState, action);
		expect(state.patchUserRequest.error).toBe(true);
		expect(state.patchUserRequest.errorMessageContent).toBe(ERROR_USER_EXISTS);
	});
});
