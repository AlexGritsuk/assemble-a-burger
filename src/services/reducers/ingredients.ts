import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';
import { INGREDIENTS_REQEST } from '@services/actions/ingredients';
import { TIngredientsState, TStateIngredients } from '@utils/types';

const initialState: TIngredientsState = {
	items: [],
	loading: false,
	error: false,
	success: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	selectors: {
		getAllItems: (state) => state.items,
		getItemsLoading: (state) => state.loading,
		getItemsError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(INGREDIENTS_REQEST.pending, (state) => ({
				...state,
				loading: true,
				error: false,
				success: false,
			}))
			.addCase(INGREDIENTS_REQEST.fulfilled, (state, action) => ({
				items: action.payload,
				loading: false,
				error: false,
				success: true,
			}))
			.addCase(INGREDIENTS_REQEST.rejected, (state) => ({
				...state,
				loading: false,
				error: true,
				success: false,
			}));
	},
});
