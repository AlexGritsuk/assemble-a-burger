export type TIngredients = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	uuid: string;
};

export type TIngredientsList = TIngredients[];

export type TConstructor = {
	dataBurger: TIngredients[];
};

////////////////////////////////////// ingredientsReducer
export interface TIngredientsState {
	items: TIngredients[];
	loading: boolean;
	error?: boolean;
	success?: boolean;
}

export interface TStateIngredients {
	ingredients: TIngredientsState;
}
/////////////////////////////////////////

export interface TConstructorIngredientsState {
	bun: TIngredients | null;
	ingr: TIngredients[];
}

export type TIngredientUUID = TIngredients & { uuid: string };
