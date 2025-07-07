export const INGREDIENTS = 'ingredients';
export const ORDERS = 'orders';

//consts
export const BUN = 'bun';
export const SAUCE = 'sauce';
export const MAIN = 'main';

// WebSocket
export const WSS_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
export const WSS_PROFILE_ORDERS = 'wss://norma.nomoreparties.space/orders';

export const ingredientTabs = [
	{
		name: 'Булки',
		type: 'bun',
	},
	{
		name: 'Соусы',
		type: 'sauce',
	},
	{
		name: 'Начинки',
		type: 'main',
	},
];

export const TABS = {
	BUN: 'bun',
	MAIN: 'main',
	SAUCE: 'sauce',
};

//Routes
export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const FORGOT_PATH = '/forgot-password';
export const RESET_PATH = '/reset-password';
export const INGREDIENT = '/ingredients/:id';
export const PROFILE_PATH = '/profile';
export const ALL_PATH = '/*';
export const ORDERS_PATH = '/profile/orders';
export const FEED_PATH = '/feed';
export const FEED_ORDER_PATH = '/feed/:id';
export const ORDER_PATH = '/profile/orders/:id';

//API
export const SERVER_CONFIG = {
	BASE_URL: `https://norma.nomoreparties.space/api/`,
	HEADERS: {
		'Content-Type': 'application/json',
	},
};
export const ACCESS_TOKEN_EXPIRES = 1200;
export const REFRESH_TOKEN_EXPIRES = 2000;
export const TOKEN_EXPIRES_NOW = 1;
export const URL_API = 'https://norma.nomoreparties.space/api/';
export const AUTH_RESET = 'password-reset';
export const AUTH_RESET_CONFIRM = 'password-reset/reset';
export const AUTH_REGISTER = 'auth/register';
export const AUTH_LOGIN = 'auth/login';
export const AUTH_TOKEN = 'auth/token';
export const AUTH_USER = 'auth/user';
export const AUTH_LOGOUT = 'auth/logout';

// Constants
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRES_AT = 'expiresAt';
export const ERROR_LOGIN = 'Неверное имя пользователя или пароль.';
export const ERROR_USER_EXISTS = 'Пользователь с таким e-mail уже существует.';
export const ERROR_DEFAULT = 'Что-то пошло не так!';
export const PATTERN_EMAIL =
	/(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\v\f\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z\d-]*[a-z\d]:(?:[\x01-\x08\v\f\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])+)\])/;
export const NOTIFICATION_USER_CREATED = 'Пользователь успешно создан';
export const NOTIFICATION_LOGIN_SUCCESS = 'Вход выполнен успешно';
export const NOTIFICATION_EMAIL_SUBMITTED =
	'На почту отправлено письмо с кодом для сброса пароля.';
export const NOTIFICATION_PASSWORD_RESET = 'Пароль успешно обновлен';
export const NOTIFICATION_LOGOUT_SUCCESS = 'Выход выполнен успешно';
export const NOTIFICATION_INCORRECT_TOKEN =
	'Код для восстановления пароля введен неверно';
export const NOTIFICATION_USER_UPDATE_SUCCESS =
	'Информация профиля успешно обновлена';
export const NOTIFICATION_USER_UPDATE_ERROR =
	'При обновлении профиля произошла ошибка';
export const NOTIFICATION_ORDER_PENDING =
	'Отправляем заказ на орбитальную станцию. Пожалуйста подождите.';
export const SERVER_RESPOND_USER_EXISTS = 'Пользователь уже существует';
export const SERVER_RESPOND_INCORRECT_TOKEN = 'Incorrect reset token';
export const SERVER_RESPOND_INCORRECT_VALUES =
	'email or password are incorrect';
export const WS_RESPOND_INCORRECT_TOKEN = 'Invalid or missing token';
