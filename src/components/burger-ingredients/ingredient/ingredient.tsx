import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ingredient.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { cartSlice } from '@services/reducers/cartSlice';
import { setModalIngredient } from '@services/reducers/modalSlice';
import { TIngredients } from '@utils/types';

type Props = {
	ingredient: TIngredients;
};



const Ingredient = ({ ingredient }: Props) => {
	const ingredientsCounter = useAppSelector(
		cartSlice.selectors.getIngredientsCounter
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const location = useLocation();
	const [, dragRef] = useDrag({
		item: ingredient,
		type: 'ingredient',
	});

	const handleIngredientClick = useCallback(() => {
		dispatch(setModalIngredient(ingredient));
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	}, [dispatch, ingredient, location, navigate]);

	const ingredientCounter = useMemo(
		() => ingredientsCounter[ingredient._id] || 0,
		[ingredient._id, ingredientsCounter]
	);

	return (
		<li
			className={styles.ingredients__item}
			onClick={handleIngredientClick}
			ref={dragRef}>
			{!!ingredientCounter && (
				<Counter count={+ingredientCounter} extraClass='m-1' size='default' />
			)}
			<picture>
				<img
					alt={ingredient.name}
					className={styles.ingredients__image}
					src={ingredient.image}
				/>
			</picture>
			<div className={styles.ingredients__price}>
				<span className='text text_type_digits-default'>
					{ingredient.price}
				</span>
				<CurrencyIcon type={'primary'} />
			</div>

			<h3
				className={clsx(
					styles.ingredients__name,
					'text',
					'text_type_main-default'
				)}>
				{ingredient.name}
			</h3>
		</li>
	);
};

export default memo(Ingredient);

