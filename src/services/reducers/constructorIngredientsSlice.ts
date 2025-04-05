import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	INGREDIENTS_ADD,
	INGREDIENTS_DELETE,
	INGREDIENTS_MOVE,
	INGREDIENTS_RESET,
} from '@services/actions/constructorIngredients';
import { TIngredients } from '@utils/types';


 const initialState = {
	bun: null as unknown as TIngredients,
	ingr: [] as TIngredients[],
};


export const constructorIngredientsSlice = createSlice({
	name: 'ConstructorIngredients',
	initialState,
	reducers: {},
	selectors: {
		getconstructorIngredients: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(INGREDIENTS_RESET, () => initialState)
			.addCase(
				INGREDIENTS_MOVE,
				(
					state,
					action: PayloadAction<{
						fromIndex: number;
						toIndex: number;
					}>
				) => {
					state.ingr.splice(
						action.payload.toIndex,
						0,
						state.ingr.splice(action.payload.fromIndex, 1)[0]
					);
				}
			)
			.addMatcher(
				(action: PayloadAction<TIngredients>) =>
					action.type === INGREDIENTS_ADD.type && 
					action.payload.type === 'bun',
				(state, action: PayloadAction<TIngredients>) => ({...state,	bun: action.payload})
			)
			.addMatcher(
				(action: PayloadAction<TIngredients>) =>
					action.type === INGREDIENTS_ADD.type && action.payload.type !== 'bun',
				(state, action: PayloadAction<TIngredients>) => ({
					...state,
					ingr: [...state.ingr, action.payload],
				})
			)
			.addMatcher(
				(action: PayloadAction<TIngredients>) =>
					action.type === INGREDIENTS_DELETE.type &&
					action.payload.type === 'bun',
				(state) => state
			)
			.addMatcher(
				(action: PayloadAction<TIngredients>) =>
					action.type === INGREDIENTS_DELETE.type &&
					action.payload.type !== 'bun',
				(state, action: PayloadAction<TIngredients>) => ({
					...state,
					ingr: state.ingr.filter((el) => el.uuid !== action.payload.uuid),
				})
			)
			.addDefaultCase((state) => state);
	},
});
