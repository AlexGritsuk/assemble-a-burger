import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '@services/api/ingredientsApi';
import { IngredientsPromise } from '@utils/types';

type IngredientsError = {
	data: unknown;
	ok: boolean;
	status: number;
	statusText: string;
	success: boolean;
	url: string;
};

export const fetchIngredients = createAsyncThunk<
	IngredientsPromise,
	void,
	{
		rejectValue: IngredientsError;
	}
>('ingredients/fetchIngredients', async (_, thunkAPI) => {
	try {
		const data = await getIngredients();
		return data;
	} catch (e) {
		const rejectWithValue = thunkAPI.rejectWithValue;		
		const error = e as unknown as IngredientsError;
		return rejectWithValue(error);
	}
});



