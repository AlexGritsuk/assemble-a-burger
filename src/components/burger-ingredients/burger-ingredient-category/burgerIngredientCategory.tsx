import { TIngredients } from '@utils/types';
import { forwardRef, ForwardedRef } from 'react';
import styles from './burgerIngredientCategory.module.scss';
import BurgerIngredientsItem from '../burger-ingredient-item/burgerIngredientsItem';

interface BurgerIngredientsCategoryProps {
	title: string;
	items: TIngredients[];
	type: string;
}

const BurgerIngredientsCategory = forwardRef(
	(
		{ title, items, type }: BurgerIngredientsCategoryProps,
		ref: ForwardedRef<HTMLHeadingElement>
	) => (
		<>
			<h2 className='text text_type_main-medium mb-6 pt-10' ref={ref}>
				{title}
			</h2>
			<div className={`${styles.category__list} ml-4 mr-4 mb-2`}>
				{items.map((item: TIngredients) => {
					return (
						<BurgerIngredientsItem item={item} type={type} key={item._id} />
					);
				})}
			</div>
		</>
	)
);

export default BurgerIngredientsCategory;
