import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients } from '@services/asyncThunk/fetchIngredients';
import { TIngredients } from '@utils/types';

interface TIngredientsState {
	ingredients: TIngredients[];
	ingredientsFetchFailed: boolean;
	ingredientsFetchRequest: boolean;
}
export const initialState: TIngredientsState = {
	ingredients: [],
	ingredientsFetchFailed: false,
	ingredientsFetchRequest: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.ingredientsFetchRequest = true;
				state.ingredientsFetchFailed = false;
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload.data;
				state.ingredientsFetchRequest = false;
			})
			.addCase(fetchIngredients.rejected, (state) => {
				state.ingredientsFetchRequest = false;
				state.ingredientsFetchFailed = true;
			});
	},
});

export const selectIngredients = (state: { ingredients: TIngredientsState }) =>
	state.ingredients.ingredients;
export const selectIngredientsFetchRequest = (state: {
	ingredients: TIngredientsState;
}) => state.ingredients.ingredientsFetchRequest;

export default ingredientsSlice.reducer;
