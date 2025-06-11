import {
	addIngredient,
	cartSlice,
	moveIngredients,
} from '@services/reducers/cartSlice';
import { selectGetUser } from '@services/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectOrderFetchStatus } from '@services/reducers/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { TIngredients } from '@utils/types';
import { LOGIN_PATH } from '@utils/vars';
import { createOrder } from '@services/asyncThunk/createOrder';
import { ensureResult } from '@services/helpers/ensureResult';
import ConstructorIngredient from './constructorIngredient/constructor-ingredient';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerEmpty from './burgerEmpty/burgerEmpty';
import {
	closeModal,
	setModalNotification,
} from '@services/reducers/modalSlice';
import uuid from 'react-uuid';

const BurgerConstructor = () => {
	const cart = useAppSelector(cartSlice.selectors.getCart);
	const user = useAppSelector(selectGetUser);
	const fetch = useAppSelector(selectOrderFetchStatus);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isButtonDisabled = useMemo(
		() => cart.bun === null || cart.ingredients.length === 0 || fetch,
		[cart.bun, cart.ingredients.length, fetch]
	);

	const redirectToLoginPage = useCallback(() => {
		navigate(LOGIN_PATH, {
			replace: true,
			state: { background: location.pathname },
		});
	}, [location.pathname, navigate]);

	const handleBurgerConstructorButton = useCallback(
		() =>
			user.isLogin
				? cart.bun !== null &&
				  dispatch(
						createOrder({
							bun: cart.bun,
							ingredients: cart.ingredients,
						})
				  )
				: redirectToLoginPage(),
		[cart, dispatch, redirectToLoginPage, user.isLogin]
	);

	const cartPrice = useMemo(() => {
		if (cart.bun !== null) {
			const bunPrice = cart.bun.price;
			const ingredientsPrice = cart.ingredients.reduce(
				(acc, current) => acc + current.price,
				0
			);
			return bunPrice + ingredientsPrice + bunPrice;
		} else {
			return 0;
		}
	}, [cart.bun, cart.ingredients]);

	const findIngredient = useCallback(
		(id: string) => {
			const ingredient = ensureResult(
				cart.ingredients.find((item) => item._id === id)
			);
			return {
				index: cart.ingredients.indexOf(ingredient),
				ingredient,
			};
		},
		[cart]
	);

	const moveIngredient = useCallback(
		(id: string, atIndex: number) => {
			const { index, ingredient } = findIngredient(id);
			dispatch(moveIngredients({ atIndex, index, ingredient }));
		},
		[dispatch, findIngredient]
	);

	const [{ isHover: isIngredientHover }, refDrop] = useDrop({
		accept: 'ingredientSort',
		collect: (monitor) => ({ isHover: monitor.isOver() }),
	});

	const ingredientElements = cart.ingredients.map((ingredient, index) => (
		<ConstructorIngredient
			index={index}
			ingredient={ingredient}
			key={ingredient.uuid}
			moveIngredient={moveIngredient}
		/>
	));	

	const [{ isHover, canDrop }, dropTarget] = useDrop({
		accept: 'ingredient',
		collect: (monitor: DropTargetMonitor) => ({
			isHover: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		drop(ingredient: TIngredients) {
			if (cart.bun === null && ingredient.type !== 'bun') {
				dispatch(setModalNotification('Сначала выберите булку!'));
				setTimeout(() => dispatch(closeModal()), 2000);
			} else if (ingredient.type !== 'bun') {
				dispatch(
					addIngredient({
						ingredient: {
							...ingredient,
							uuid: uuid(),
						},
					})
				);
			} else {
				dispatch(addIngredient({ ingredient: ingredient }));
			}
		},
	});

	return (
		<section className={`mt-25 ${styles.section}`}>
			<div ref={dropTarget}>
				{!cart.bun ? (
					<BurgerEmpty
						isLocked={true}
						position='top'
						type='bun'
						isHover={isHover}
						canDrop={canDrop}
					/>
				) : (
					<ul className={styles.cart__list}>
						<li className={styles.cart__item}>
							<ConstructorElement
								extraClass={styles.cart__bun}
								isLocked={true}
								price={cart.bun.price}
								text={`${cart.bun.name} (верх)`}
								thumbnail={cart.bun.image}
								type={'top'}
							/>
						</li>
					</ul>
				)}

				{cart.ingredients.length > 0 ? (
					<ul
						className={clsx(
							styles.cart__ingredients_list,
							isIngredientHover && styles.cart__ingredients_list_hovered
						)}
						ref={refDrop}>
						{ingredientElements}
					</ul>
				) : (
					<BurgerEmpty
						isLocked={false}
						type='ingredient'
						isHover={isHover}
						canDrop={canDrop}
					/>
				)}

				{!cart.bun ? (
					<BurgerEmpty
						isLocked={true}
						position='bottom'
						type='bun'
						isHover={isHover}
						canDrop={canDrop}
					/>
				) : (
					<ul className={styles.cart__list}>
						<li className={styles.cart__item}>
							<ConstructorElement
								extraClass={styles.cart__bun}
								isLocked={true}
								price={cart.bun.price}
								text={`${cart.bun.name} (низ)`}
								thumbnail={cart.bun.image}
								type={'bottom'}
							/>
						</li>
					</ul>
				)}
			</div>
			<div className={styles.cart__footer}>
				<div className={styles.cart__price}>
					<span className='text text_type_digits-medium'>{cartPrice}</span>
					<span>
						<CurrencyIcon type={'primary'} />
					</span>
				</div>
				<Button
					disabled={isButtonDisabled}
					extraClass={styles.button}
					htmlType='button'
					onClick={handleBurgerConstructorButton}
					size='large'
					type='primary'>
					{fetch ? 'Оформляем заказ...' : 'Оформить заказ'}
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
