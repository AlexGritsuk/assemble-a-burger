import burgerIngredients from './burger-ingredients.module.scss';
import BurgerIngredientsContainer from './burger-ingredients-container/burgerIngredientsContainer';
import BurgerIngredientsNav from './burger-ingredients-nav/burgerIngredientsNav';
import React from 'react';

interface DataProps {
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
}

const BurgerIngredients = (props: any) => {	
	return (
		<div className={burgerIngredients.burgerIngredients}>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<BurgerIngredientsNav />

			<BurgerIngredientsContainer />
		</div>
	);
};

export default BurgerIngredients;
