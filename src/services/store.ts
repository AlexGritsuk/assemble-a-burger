import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredients';
import { constructorIngredientsSlice } from './reducers/constructorIngredientsSlice';
import { orderSlice } from './reducers/order';
import { forgotSlice } from './auth/forgotPassword';
import { registerSlice } from './auth/register';
import { loginSlice } from './auth/login';
import { checkAuthSlice } from './auth/checkAuth';
import { userInfoSlice } from './auth/userInfo';
import { updateSlice } from './auth/update'
import { logoutSlice } from './auth/logOut';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorIngredientsSlice,	
	orderSlice,
	checkAuthSlice,
	userInfoSlice,
	updateSlice,
	logoutSlice,
	loginSlice,
	registerSlice,
	forgotSlice
);

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
