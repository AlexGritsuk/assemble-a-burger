import BurgerConstructor from '@components/burger-constructor/burgerConstructor';
import mainConstructor from './mainConstructor.module.scss';
import BurgerIngredients from '@components/burger-ingredients/burgerIngredients';

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
