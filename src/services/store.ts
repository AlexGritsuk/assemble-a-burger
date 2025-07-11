import { logoutSlice } from './reducers/logoutSlice';
import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredientsSlice';
import { modalSlice } from './reducers/modalSlice';
import { loadingSlice } from './reducers/loadingSlice';
import { userSlice } from './reducers/userSlice';
import { loginSlice } from './reducers/loginSlice';
import { passwordSlice } from './reducers/passwordSlice';
import { registerSlice } from './reducers/registerSlice';
import { orderSlice } from './reducers/orderSlice';
import { cartSlice } from './reducers/cartSlice';
import { wsActions, wsSlice } from './reducers/wsSlice';
import { socketMiddleware } from './middleware/socketMiddleware';

const rootReducer = combineSlices(
	ingredientsSlice,
	userSlice,
	loadingSlice,
	cartSlice,
	orderSlice,
	logoutSlice,
	loginSlice,
	passwordSlice,
	registerSlice,
	modalSlice,
	wsSlice
);

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(socketMiddleware(wsActions)),
	reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
