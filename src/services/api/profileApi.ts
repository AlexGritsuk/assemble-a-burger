import { authorizationRequest, request } from '@services/helpers/request';
import {
	ForgotPasswordInput,
	ForgotPasswordPromise,
	LoginInput,
	LoginPromise,
	LogoutInput,
	LogoutPromise,
	ResetPasswordInput,
	ResetPasswordPromise,
	User,
	UserPromise,
	fetchUpdateUserInput,
} from '@utils/types';

export const registerUser = ({ email, name, password }: User) =>
	request('auth/register', {
		body: JSON.stringify({ email, name, password }),
		method: 'POST',
	}) as Promise<LoginPromise>;

export const loginUser = ({ email, password }: LoginInput) =>
	request('auth/login', {
		body: JSON.stringify({ email, password }),
		method: 'POST',
	}) as Promise<LoginPromise>;

export const logoutUser = ({ token }: LogoutInput) =>
	request('auth/logout', {
		body: JSON.stringify({ token }),
		method: 'POST',
	}) as Promise<LogoutPromise>;

export const forgotPassword = ({ email }: ForgotPasswordInput) =>
	request('password-reset', {
		body: JSON.stringify({ email }),
		method: 'POST',
	}) as Promise<ForgotPasswordPromise>;

export const resetPassword = ({ password, token }: ResetPasswordInput) =>
	request('password-reset/reset', {
		body: JSON.stringify({ password, token }),
		method: 'POST',
	}) as Promise<ResetPasswordPromise>;

export const getUser = () =>
	authorizationRequest('auth/user') as Promise<UserPromise>;

export const patchUser = (userData: fetchUpdateUserInput) =>
	authorizationRequest('auth/user', {
		body: JSON.stringify(userData),
		method: 'PATCH',
	}) as Promise<UserPromise>;
