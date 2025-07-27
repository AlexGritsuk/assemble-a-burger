import { fetchResetPassword } from '@services/asyncThunk/fetchResetPassword';
import { passwordSlice, setErrorMessage, setMessage } from './passwordSlice';
import { fetchForgotPassword } from '@services/asyncThunk/fetchForgotPassword';

describe('passwordSlice', () => {
	const initialState = passwordSlice.getInitialState();

	it('должен правильно обрабатывать setErrorMessage', () => {
		const newState = passwordSlice.reducer(initialState, setErrorMessage(true));
		expect(newState.forgotPasswordRequest.errorMessage).toBe(true);
		expect(newState.resetPasswordRequest.errorMessage).toBe(true);
	});

	it('должен правильно обрабатывать setMessage', () => {
		const newState = passwordSlice.reducer(initialState, setMessage(true));
		expect(newState.forgotPasswordRequest.message).toBe(true);
		expect(newState.resetPasswordRequest.message).toBe(true);
	});

	it('обработка fetchForgotPassword.pending', () => {
		const action = { type: fetchForgotPassword.pending.type };
		const newState = passwordSlice.reducer(initialState, action);
		expect(newState.isEmailSubmitted).toBe(false);
		expect(newState.forgotPasswordRequest.fetch).toBe(true);
	});

	it('обработка fetchForgotPassword.fulfilled', () => {
		const action = { type: fetchForgotPassword.fulfilled.type };
		const newState = passwordSlice.reducer(initialState, action);
		expect(newState.isEmailSubmitted).toBe(true);
		expect(newState.forgotPasswordRequest.fetch).toBe(false);
		expect(newState.forgotPasswordRequest.message).toBe(true);
	});

	it('обработка fetchForgotPassword.rejected с payload.message', () => {
		const action = {
			type: fetchForgotPassword.rejected.type,
			payload: { message: 'Ошибка' },
			error: {},
		};
		const newState = passwordSlice.reducer(initialState, action);
		expect(newState.forgotPasswordRequest.error).toBe(true);
		expect(newState.forgotPasswordRequest.errorMessageContent).toBe('Ошибка');
	});

	it('обработка fetchResetPassword.pending', () => {
		const action = { type: fetchResetPassword.pending.type };
		const newState = passwordSlice.reducer(initialState, action);
		expect(newState.isPasswordChanged).toBe(false);
		expect(newState.resetPasswordRequest.fetch).toBe(true);
	});

	it('обработка fetchResetPassword.fulfilled', () => {
		const action = { type: fetchResetPassword.fulfilled.type };
		const newState = passwordSlice.reducer(initialState, action);
		expect(newState.isPasswordChanged).toBe(true);
		expect(newState.resetPasswordRequest.fetch).toBe(false);
	});
});
