import reducer, {
	addIngredient,
	cleanCart,
	moveIngredients,
	removeIngredient,
	CartState,
} from './cartSlice';

// Модели ингредиентов для тестов
const bun = {
	_id: '60d3b41abdacab0026a733c7',
	name: 'Флюоресцентная булка R2-D3',
	type: 'bun',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/bun-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
	__v: 0,
};

const meat = {
	_id: '60d3b41abdacab0026a733ca',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: 'main',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	__v: 0,
};

const lettuce = {
	_id: '60d3b41abdacab0026a733ca',
	name: 'Говяжий метеорит (отбивная)',
	type: 'main',
	proteins: 800,
	fat: 800,
	carbohydrates: 300,
	calories: 2674,
	price: 3000,
	image: 'https://code.s3.yandex.net/react/code/meat-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
	__v: 0,
};

describe('cartSlice reducers', () => {
	let initialState: CartState;

	beforeEach(() => {
		initialState = {
			cart: {
				bun: null,
				ingredients: [],
			},
			ingredientsCounter: {},
		};
	});

	test('добавление булки', () => {
		const newState = reducer(initialState, addIngredient({ ingredient: bun }));
		expect(newState.cart.bun).toEqual(bun);
		expect(newState.ingredientsCounter[bun._id]).toBe(1);
	});

	test('добавление обычного ингредиента', () => {
		const state = reducer(initialState, addIngredient({ ingredient: meat }));
		expect(state.cart.ingredients).toContainEqual(meat);
		expect(state.ingredientsCounter[meat._id]).toBe(1);
	});

	test('увеличение счетчика при повторном добавлении', () => {
		let state = reducer(initialState, addIngredient({ ingredient: lettuce }));
		state = reducer(state, addIngredient({ ingredient: lettuce }));

		// Проверяем что счетчик увеличился
		expect(state.ingredientsCounter[lettuce._id]).toBe(2);
		// Ингредиент присутствует в массиве
		expect(
			state.cart.ingredients.filter((i) => i._id === lettuce._id).length
		).toBe(2);
	});

	test('смена булки при добавлении новой булки', () => {
		let state = reducer(initialState, addIngredient({ ingredient: bun }));

		// Добавляем другую булку (например, с другим _id)
		const newBun = {
			...bun,
			_id: '60d3b41abdacab0026a733d0',
			name: 'Новая булка',
		};
		state = reducer(state, addIngredient({ ingredient: newBun }));

		expect(state.cart.bun).toEqual(newBun);
		// Счетчик старой булки сбрасывается
		expect(state.ingredientsCounter[bun._id] || 0).toBe(0);
		// Счетчик новой булки равен 1
		expect(state.ingredientsCounter[newBun._id]).toBe(1);
	});

	test('очистка корзины', () => {
		let state = reducer(initialState, addIngredient({ ingredient: bun }));
		state = reducer(state, addIngredient({ ingredient: meat }));

		const clearedState = reducer(state, cleanCart());

		expect(clearedState.cart.bun).toBeNull();
		expect(clearedState.cart.ingredients).toHaveLength(0);
		expect(clearedState.ingredientsCounter).toEqual({});
	});

	test('перемещение ингредиента внутри массива', () => {
		// Добавляем два ингредиента
		let state = reducer(initialState, addIngredient({ ingredient: meat }));
		state = reducer(state, addIngredient({ ingredient: lettuce }));

		// Перемещаем lettuce на позицию перед meat
		const atIndex = 1;
		const index = 0;

		const movedState = reducer(
			state,
			moveIngredients({
				atIndex,
				index,
				ingredient: lettuce,
			})
		);

		expect(movedState.cart.ingredients[0]._id).toBe(lettuce._id);
		expect(movedState.cart.ingredients[1]._id).toBe(meat._id);
	});

	test('удаление ингредиента уменьшает счетчик и удаляет из массива', () => {
		
		let state = reducer(initialState, addIngredient({ ingredient: meat }));

		const prevCount = state.ingredientsCounter[meat._id];

		const newState = reducer(
			state,
			removeIngredient({ _id: meat._id, index: 0 })
		);

		
		expect(newState.ingredientsCounter[meat._id]).toBe(prevCount - 1);

		
		expect(
			newState.cart.ingredients.find((i) => i._id === meat._id)
		).toBeUndefined();
	});
});
