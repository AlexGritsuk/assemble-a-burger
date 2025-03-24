import burgerIngredients from './burger-ingredients.module.scss';
import BurgerIngredientsContainer from './burger-ingredients-container/burgerIngredientsContainer';
import BurgerIngredientsNav from './burger-ingredients-nav/burgerIngredientsNav';
import { TConstructor } from '@utils/types';

const BurgerIngredients = ({ dataBurger }: TConstructor) => {
	return (
		<div className={burgerIngredients.burgerIngredients}>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<BurgerIngredientsNav />
			<BurgerIngredientsContainer dataBurger={dataBurger} />
		</div>
	);
};

export default BurgerIngredients;
