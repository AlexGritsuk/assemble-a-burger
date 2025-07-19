import reducer, {
	setErrorMessage,
	setMessage,
	selectRegisterError,
	selectRegisterErrorMessage,
	selectRegisterErrorMessageContent,
	selectRegisterFetch,
	selectRegisterMessage,
	selectRegisterMessageContent,
} from './registerSlice';
import { fetchRegister } from '@services/asyncThunk/fetchRegister';
import { RootState } from '@services/store';
import { ERROR_USER_EXISTS, SERVER_RESPOND_USER_EXISTS } from '@utils/vars';

const initialState = {
	error: false,
	errorMessage: false,
	errorMessageContent: 'Ошибка по умолчанию',
	fetch: false,
	message: false,
	messageContent: 'Пользователь успешно зарегистрирован',
};

describe('registerSlice reducer', () => {
	it('обрабатывает fetchRegister.pending', () => {
		const state = reducer(initialState, { type: fetchRegister.pending.type });
		expect(state.fetch).toBe(true);
		expect(state.error).toBe(false);
		expect(state.message).toBe(false);
		expect(state.errorMessage).toBe(false);
	});

	it('обрабатывает fetchRegister.fulfilled', () => {
		const state = reducer(initialState, { type: fetchRegister.fulfilled.type });
		expect(state.fetch).toBe(false);
	});

	it('обрабатывает fetchRegister.rejected с сообщением о существующем пользователе', () => {
		const payload = { data: { message: SERVER_RESPOND_USER_EXISTS } };
		const action = { type: fetchRegister.rejected.type, payload };
		const state = reducer(initialState, action);
		expect(state.fetch).toBe(false);
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe(true);
		expect(state.errorMessageContent).toBe(ERROR_USER_EXISTS);
	});

	it('обрабатывает fetchRegister.rejected с другим сообщением', () => {
		const payload = { data: { message: 'Другая ошибка' } };
		const action = { type: fetchRegister.rejected.type, payload };
		const state = reducer(initialState, action);
		expect(state.fetch).toBe(false);
		expect(state.error).toBe(true);
		expect(state.errorMessage).toBe(true);
		expect(state.errorMessageContent).toBe('Другая ошибка');
	});

	it('обрабатывает fetchRegister.rejected без payload', () => {
		const action = {
			type: fetchRegister.rejected.type,
			error: new Error('Ошибка'),
		};
		const state = reducer(initialState, action);
		expect(state.fetch).toBe(false);
		expect(state.error).toBe(true);
		expect(state.errorMessageContent).toBe('Ошибка по умолчанию');
	});
});

describe('селекторы', () => {
	const mockState = {
		register: {
			error: true,
			errorMessage: true,
			errorMessageContent: 'Тестовая ошибка',
			fetch: true,
			message: true,
			messageContent: 'Тестовое сообщение',
		},
	} as RootState;

	it('selectRegisterError возвращает ошибку', () => {
		expect(selectRegisterError(mockState)).toBe(true);
	});

	it('selectRegisterErrorMessage возвращает флаг ошибки сообщения', () => {
		expect(selectRegisterErrorMessage(mockState)).toBe(true);
	});

	it('selectRegisterErrorMessageContent возвращает содержимое ошибки', () => {
		expect(selectRegisterErrorMessageContent(mockState)).toBe(
			'Тестовая ошибка'
		);
	});

	it('selectRegisterFetch возвращает статус загрузки', () => {
		expect(selectRegisterFetch(mockState)).toBe(true);
	});

	it('selectRegisterMessage возвращает флаг сообщения', () => {
		expect(selectRegisterMessage(mockState)).toBe(true);
	});

	it('selectRegisterMessageContent возвращает содержимое сообщения', () => {
		expect(selectRegisterMessageContent(mockState)).toBe('Тестовое сообщение');
	});
});
