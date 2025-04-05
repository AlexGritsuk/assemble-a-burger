import burgerIngredients from './burgerIngredients.module.scss';
import { TIngredients } from '@utils/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { INGREDIENTS_REQEST } from '@services/actions/ingredients';
import { BUN, INGREDIENTS, MAIN, SAUCE } from '@utils/vars';
import { ingredientsSlice } from '@services/reducers/ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from './burger-ingredient-category/burgerIngredientCategory';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { detailsIngredientSlice } from '@services/reducers/detailsIngredient';
import Modal from '@components/modals/modal/modal';
import ModalInfo from '@components/modals/modal-info/modalInfo';
import { DETAILS_RESET } from '@services/actions/detailsIngredient';

const BurgerIngredients = () => {
	const [current, setCurrent] = useState('bun');
	const isLoading = useAppSelector(ingredientsSlice.selectors.getItemsLoading);
	const details = useAppSelector(detailsIngredientSlice.selectors.getDetails);		

	const ingredients: TIngredients[] = useAppSelector(
		ingredientsSlice.selectors.getAllItems
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(INGREDIENTS_REQEST(INGREDIENTS));
	}, [dispatch]);

	const handleCloseModal = () => {
		dispatch(DETAILS_RESET());
	};

	const scrollBoxRef = useRef<HTMLDivElement | null>(null);
	const navTabsRef = useRef<HTMLHeadingElement | null>(null);
	const bunsRef = useRef<HTMLHeadingElement | null>(null);
	const saucesRef = useRef<HTMLHeadingElement | null>(null);
	const mainsRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		const navTabsTop = navTabsRef.current?.getBoundingClientRect().bottom;

		const scrollIngredients = () => {
			const bunsTop = bunsRef.current?.getBoundingClientRect().top;
			const saucesTop = saucesRef.current?.getBoundingClientRect().top;
			const mainsTop = mainsRef.current?.getBoundingClientRect().top;

			if (navTabsTop && bunsTop && saucesTop && mainsTop) {
				const bunsActive = bunsTop - navTabsTop;
				const saucesActive = saucesTop - navTabsTop;
				const mainsActive = mainsTop - navTabsTop;

				if (bunsActive <= 0 && saucesActive > 0 && mainsActive > 0) {
					setCurrent(BUN);
				}
				if (bunsActive < 0 && saucesActive <= 0 && mainsActive > 0) {
					setCurrent(SAUCE);
				}
				if (bunsActive < 0 && saucesActive < 0 && mainsActive <= 0) {
					setCurrent(MAIN);
				}
			}
		};
		scrollBoxRef.current?.addEventListener('scroll', scrollIngredients, {
			passive: true,
		});
		return () => {
			scrollBoxRef.current?.removeEventListener('scroll', scrollIngredients);
		};
	}, [isLoading]);

	const bunIngr = useMemo(
		() => ingredients?.filter((item) => item.type === BUN),
		[ingredients]
	);
	const SauceIngr = useMemo(
		() => ingredients?.filter((item) => item.type === SAUCE),
		[ingredients]
	);
	const MainIngr = useMemo(
		() => ingredients?.filter((item) => item.type === MAIN),
		[ingredients]
	);

	return (
		<>
			<div className={burgerIngredients.wrapper}>
				<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
				{!isLoading ? (
					<>
						<nav style={{ display: 'flex' }} ref={navTabsRef}>
							<Tab value={BUN} active={current === BUN} onClick={setCurrent}>
								Булки
							</Tab>
							<Tab
								value={SAUCE}
								active={current === SAUCE}
								onClick={setCurrent}>
								Соусы
							</Tab>
							<Tab value={MAIN} active={current === MAIN} onClick={setCurrent}>
								Начинки
							</Tab>
						</nav>
						<div
							ref={scrollBoxRef}
							className={`${burgerIngredients.container}`}>
							<div className={burgerIngredients.inner}>
								<BurgerIngredientsCategory
									title='Булки'
									items={bunIngr}
									ref={bunsRef}
									type={BUN}
								/>
								<BurgerIngredientsCategory
									title='Соусы'
									items={SauceIngr}
									ref={saucesRef}
									type={INGREDIENTS}
								/>
								<BurgerIngredientsCategory
									title='Начинки'
									items={MainIngr}
									ref={mainsRef}
									type={INGREDIENTS}
								/>
							</div>
						</div>
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
			{details && (
				<Modal onClose={() => handleCloseModal()} title='Детали ингредиента'>
					<ModalInfo details={details} />
				</Modal>
			)}
		</>
	);
};

export default BurgerIngredients;
