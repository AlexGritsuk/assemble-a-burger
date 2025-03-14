import React from 'react';
import BurgerConstructor from '@components/burger-constructor/burgerConstructor';
import BurgerIngredients from '@components/burger-ingredients/burgerIngredients';
import mainConstructor from './mainConstructor.module.scss';
import { loadData } from '@utils/data';

const MainConstructor = () => {
	

	return (
		<main className={`${mainConstructor.main} pt-10 pl-5 pr-5`}>
			<section className={mainConstructor.mainConstructor}>
				<BurgerIngredients />

				<BurgerConstructor />
			</section>
		</main>
	);
};

export default MainConstructor;
