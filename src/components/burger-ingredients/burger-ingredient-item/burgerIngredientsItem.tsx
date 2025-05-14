import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerIngredientsItem.module.scss';
import { useMemo } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { TIngredients } from '@utils/types';
import { constructorIngredientsSlice } from '@services/reducers/constructorIngredientsSlice';
import { useAppSelector } from '../../../hooks';
import { Link, useLocation } from 'react-router-dom';
import { INGREDIENTS_PATH } from '@utils/vars';

interface BurgerIngredientsItemProps {
	item: TIngredients;
	type: string;
}

const BurgerIngredientsItem = ({ item, type }: BurgerIngredientsItemProps) => {	
	const location = useLocation();

	const ingredients = useAppSelector(
		constructorIngredientsSlice.selectors.getconstructorIngredients
	);

	const [{ opacity }, dragRef, dragPreview] = useDrag(
		() => ({
			type: type,
			item: item,
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[item, type]
	);

	const count = useMemo(() => {
		let count = 0;
		if (item.type === 'bun' && ingredients.bun) {
			ingredients.bun._id === item._id ? (count = 2) : (count = 0);
		}
		if (item.type !== 'bun' && ingredients.ingr.length > 0) {
			ingredients.ingr.map((elem: TIngredients) =>
				elem._id === item._id ? (count += 1) : count
			);
		}
		if (item.type !== 'bun' && ingredients.ingr.length === 0) {
			count = 0;
		}
		return count;
	}, [ingredients]);

	return (
		<div style={{ cursor: 'pointer' }}>
			<DragPreviewImage connect={dragPreview} src={item.image} />
			<Link
				to={INGREDIENTS_PATH + '/' + item._id}
				state={{ backgroundLocation: location }}
				key={item._id}
				ref={dragRef}				
				style={{ opacity }}
				className={`mb-8 ${styles.link}`}>
				<span className={styles.count}>
					{count > 0 && <Counter count={count} />}
				</span>
				<img
					className={`${styles.img} pl-4 pr-4 mb-1`}
					src={item.image}
					alt={item.name}
				/>
				<p className={`${styles.price} text text_type_digits-default mb-1`}>
					{item.price}
					<CurrencyIcon type='primary' />
				</p>
				<p className={`${styles.name} text text_type_main-default`}>
					{item.name}
				</p>
			</Link>
		</div>
	);
};

export default BurgerIngredientsItem;
