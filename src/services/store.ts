import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredients';
import { constructorIngredientsSlice } from './reducers/constructorIngredientsSlice';
import { detailsIngredientSlice } from './reducers/detailsIngredient';
import { orderSlice } from './reducers/order';
// import BurgerConstructorReducer from './reducers/constructorIngredients';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorIngredientsSlice,
	detailsIngredientSlice,
	orderSlice
);

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
