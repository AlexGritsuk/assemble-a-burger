import burgerIngredientsContainer from './burgerIngredientsContainer.module.scss';
import BurgerCategory from './burger-category/burgerCategory';
import { TConstructor, TburgerData } from '@utils/types';

const BurgerIngredientsContainer = ({ dataBurger }: TConstructor) => {
	return (
		<div className={burgerIngredientsContainer.scroll}>
			<div className={burgerIngredientsContainer.inner}>
				<div>
					<h2 className='text text_type_main-medium mb-6 pt-6'>Булки</h2>
					<div className={burgerIngredientsContainer.category}>
						{dataBurger
							.filter((el: TburgerData) => el.type === 'bun')
							.map((bun: TburgerData) => (
								<BurgerCategory key={bun._id} {...bun} />
							))}
					</div>
					<h2 className='text text_type_main-medium mb-6 pt-6'>Соусы</h2>
					<div className={burgerIngredientsContainer.category}>
						{dataBurger
							.filter((el: TburgerData) => el.type === 'sauce')
							.map((sauce: TburgerData) => (
								<BurgerCategory key={sauce._id} {...sauce} />
							))}
					</div>
					<h2 className='text text_type_main-medium mb-6 pt-6'>Начинки</h2>
					<div className={burgerIngredientsContainer.category}>
						{dataBurger
							.filter((el: TburgerData) => el.type === 'main')
							.map((main: TburgerData) => (
								<BurgerCategory key={main._id} {...main} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BurgerIngredientsContainer;
