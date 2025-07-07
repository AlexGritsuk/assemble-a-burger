import { PayloadAction } from '@reduxjs/toolkit';
import { fetchGetUser } from '@services/asyncThunk/fetchGetUser';
import { AppDispatch, RootState } from '@services/store';
import { WebsocketActions, WebsocketState } from '@utils/types';
import { WS_RESPOND_INCORRECT_TOKEN } from '@utils/vars';
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware =
	(wsActions: WebsocketActions): Middleware =>
	(store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		const handleMessage = (event: MessageEvent<string>) => {
			const { dispatch } = store;
			try {
				const data = JSON.parse(event.data) as WebsocketState & {
					message?: string;
				};

				if (data.message && data.message === WS_RESPOND_INCORRECT_TOKEN) {
					void dispatch(fetchGetUser());
				}
				if (data.orders) {
					data.orders.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);

					dispatch({
						payload: data,
						type: wsActions.onMessage,
					});
				}
			} catch (error) {
				console.error('Ошибка WebSocket:', error);
			}
		};

		return (next) => (action: any) => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { onClose, onError, onMessage, onOpen, wsInit } = wsActions;

			if (type === wsInit && typeof payload === 'string') {
				socket = new WebSocket(payload);
			}

			if (
				(type === wsInit || type === onClose) &&
				socket?.readyState === WebSocket.OPEN
			) {
				socket.close();
			}

			if (socket) {
				socket.onopen = () => {
					dispatch({ type: onOpen });
				};

				socket.onerror = () => {
					dispatch({ type: onError });
				};

				socket.onmessage = handleMessage;

				socket.onclose = () => {
					dispatch({ type: onClose });
					socket = null;
				};
			}

			next(action);
		};
	};
