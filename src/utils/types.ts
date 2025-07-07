export type TIngredients = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	quantity?: number;
	uuid?: string | undefined;
};

export type IngredientsPromise = {
	data: TIngredients[];
	success: boolean;
};

export type TIngredientsList = TIngredients[];

export type TConstructor = {
	dataBurger: TIngredients[];
};

export interface TConstructorIngredientsState {
	bun: TIngredients | null;
	ingr: TIngredients[];
}

export type TIngredientUUID = TIngredients & { uuid: string };

export interface Cart {
	bun: TIngredients;
	ingredients: TIngredients[];
}

export interface User {
	createdAt?: string;
	email: string;
	name: string;
	password?: string;
	updatedAt?: string;
}

export interface Order {
	_id: string;
	createdAt: string;
	ingredients: string[];
	name: string;
	number: number;
	status: 'created' | 'done' | 'pending';
	updatedAt: string;
}

export interface OrderPromise {
	name: string;
	order: Order;
	success: boolean;
}

export interface LoginPromise {
	accessToken: string;
	refreshToken: string;
	success: boolean;
	user: User;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface LogoutPromise {
	message: string;
	success: boolean;
}

export interface LogoutInput {
	token: string;
}

export interface ForgotPasswordPromise {
	message: string;
	success: boolean;
}

export interface ForgotPasswordInput {
	email: string;
}

export interface ResetPasswordInput {
	password: string;
	token: string;
}

export interface ResetPasswordPromise {
	message: string;
	success: boolean;
}

export interface UserPromise {
	success: boolean;
	user: User;
}

export interface fetchUpdateUserInput {
	email: string;
	name: string;
	password?: string;
}

export interface UserError {
	[key: string]: unknown;
	message: string;
}

export interface State {
	error: boolean;
	errorMessage: boolean;
	errorMessageContent: string;
	fetch: boolean;
	message: boolean;
	messageContent: string;
}

export interface Token {
	accessToken: null | string;
	expiresAt: null | string;
	refreshToken: null | string;
}

export interface GetOrdersPromise {
	orders: Order[];
	success: boolean;
}

export interface TabShape {
	name: string;
	type: string;
}

export interface WebsocketState {
	orders: Order[] | null;
	total: number;
	totalToday: number;
	wsConnected: boolean;
}

export interface WebsocketActions {
	onClose: string;
	onError: string;
	onMessage: string;
	onOpen: string;
	wsInit: string;
}

export interface Order {
	_id: string;
	createdAt: string;
	ingredients: string[];
	name: string;
	number: number;
	status: 'created' | 'done' | 'pending';
	updatedAt: string;
}
