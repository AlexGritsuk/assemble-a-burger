import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './order.module.css';
import { Order, TIngredientsList } from '@utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ensureResult } from '@services/helpers/ensureResult';
import { setModalOrder } from '@services/reducers/modalSlice';
import { selectIngredients } from '@services/reducers/ingredientsSlice';

type Props = {
	order: Order;
};

const Order = ({ order }: Props) => {
	const ingredients = useAppSelector(selectIngredients);
	const date = new Date(order.createdAt);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const orderIngredients = order.ingredients.map((orderIngredientId: string) =>
		ensureResult(
			ingredients.find((ingredient) => ingredient._id === orderIngredientId)
		)
	);
	const checkTotalPrice = (ingredientsArray: TIngredientsList) =>
		ingredientsArray.reduce((prev, current) => prev + current.price, 0);

	const ingredientsOrder = useMemo(
		() =>
			order.ingredients.slice(0, 6).map((item, index) => {
				const ingredientsItem = ingredients.find((i) => i._id === item);
				const remainingIngredients = order.ingredients.slice(6).length;
				const transformValue = `translateX(-${16 * index}px)`;
				const zIndexValue = -index;

				return (
					ingredientsItem && (
						<li
							style={{
								transform: transformValue,
								zIndex: zIndexValue,
							}}
							key={index}>
							<img
								className={clsx(styles.image, {
									[styles.image_last]:
										index === 5 && remainingIngredients !== 0,
								})}
								alt={`Ингредиент ${ingredientsItem.name}`}
								src={ingredientsItem.image}
							/>
							{index === 5 && remainingIngredients !== 0 && (
								<p
									className={clsx(
										styles.remaining_ingredients,
										'text_type_digits-default',
										'text'
									)}>
									+{remainingIngredients}
								</p>
							)}
						</li>
					)
				);
			}),
		[ingredients, order.ingredients]
	);

	const handleArticleClick = () => {
		dispatch(setModalOrder(order));
		if (location.pathname === '/feed') {
			navigate(`/feed/${order.number}`, { state: { background: location } });
		} else if (location.pathname === '/profile/orders') {
			navigate(`/profile/orders/${order.number}`, {
				state: { background: location },
			});
		}
	};

	return (
		<article className={clsx(styles.item)} onClick={handleArticleClick}>
			<div className={clsx(styles.numbers)}>
				<span className={clsx('text', 'text_type_digits-default')}>
					#{order.number}
				</span>
				<FormattedDate
					className={'text text_type_main-default text_color_inactive'}
					date={date}
				/>
			</div>
			<div className={styles.heading}>
				<h3 className={'text text_type_main-medium'}>{order.name}</h3>
				<p
					className={clsx('text', 'text_type_main-default', styles.status, {
						[styles.status_done]: order.status === 'done',
					})}>
					{order.status === 'created' && 'Создан'}
					{order.status === 'pending' && 'Готовится'}
					{order.status === 'done' && 'Выполнен'}
				</p>
			</div>
			<div className={styles.content}>
				<ul className={clsx(styles.ingredients_list, 'page__list')}>
					{ingredientsOrder}
				</ul>
				<span className={styles.price}>
					<span className={'text text_type_digits-default'}>
						{checkTotalPrice(orderIngredients)}
					</span>
					<CurrencyIcon type='primary' />
				</span>
			</div>
		</article>
	);
};

export default Order;
