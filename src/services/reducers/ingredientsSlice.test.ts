import reducer, { initialState } from './ingredientsSlice';
import { fetchIngredients } from '@services/asyncThunk/fetchIngredients';

describe('ingredientsSlice reducer', () => {
	it('выборка ингредиентов.pending', () => {
		const action = { type: fetchIngredients.pending.type };
		const state = reducer(initialState, action);
		expect(state.ingredientsFetchRequest).toBe(true);
		expect(state.ingredientsFetchFailed).toBe(false);
	});

	it('выборка ингредиентов.fulfilled', () => {
		const mockData = [{ id: 1, name: 'Ingredient 1' }];
		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: { data: mockData },
		};
		const state = reducer({ ...initialState, ingredients: [] }, action);
		expect(state.ingredients).toEqual(mockData);
		expect(state.ingredientsFetchRequest).toBe(false);
	});

	it('выборка ингредиентов.rejected', () => {
		const action = { type: fetchIngredients.rejected.type };
		const state = reducer({ ...initialState, ingredients: [] }, action);
		expect(state.ingredientsFetchRequest).toBe(false);
		expect(state.ingredientsFetchFailed).toBe(true);
	});
});
