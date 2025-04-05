import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	DETAILS_ADD,
	DETAILS_RESET,
} from '@services/actions/detailsIngredient';


// Пока на Js, с типами позже разберусь

export const detailsIngredientSlice = createSlice({
	name: 'details',
	initialState: null,
	reducers: {},
	selectors: {
		getDetails: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(DETAILS_ADD, (state, action) => action.payload)
			.addCase(DETAILS_RESET, () => null)

			.addDefaultCase((state) => state);
	},
});

