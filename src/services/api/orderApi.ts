import { GetOrdersPromise, OrderPromise } from '@utils/types';
import { request } from '../helpers/request';

export const postOrder = ({ ingredients }: { ingredients: string[] }) =>
	request('orders', {
		body: JSON.stringify({ ingredients }),
		method: 'POST',
	}) as Promise<OrderPromise>;
export const getOrder = ({ orderNumber }: { orderNumber: number }) =>
	request(`orders/${orderNumber}`) as Promise<GetOrdersPromise>;
