import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectIngredients } from '@services/reducers/ingredientsSlice';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import { TIngredients, TabShape } from '@utils/types';
import { TABS, ingredientTabs } from '@utils/vars';
import Ingredient from '@components/burger-ingredients/ingredient/ingredient';
import Tabs from '@components/tabs/tabs';
import IngredientsContainer from './ingredients-container/ingredients-container';

const BurgerIngredients = () => {
	const [tabs] = useState<TabShape[]>(ingredientTabs);
	const [currentTab, setCurrentTab] = useState(TABS.BUN);
	const [isScrollable, setIsScrollable] = useState(true);

	const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
	const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
	const [mainsRef, inViewMain] = useInView({ threshold: 0 });

	useEffect(() => {
		if (isScrollable) {
			if (inViewBuns) {
				setCurrentTab(TABS.BUN);
			} else if (inViewSauces) {
				setCurrentTab(TABS.SAUCE);
			} else if (inViewMain) {
				setCurrentTab(TABS.MAIN);
			}
		}
	}, [inViewBuns, inViewMain, inViewSauces, isScrollable]);

	const scrollToId = useCallback((tab: string) => {
		const element = document.getElementById(tab);
		if (element) {
			setIsScrollable(false);
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	const handleTabClick = useCallback(
		(value: string) => {
			setCurrentTab(value);
			scrollToId(value);
		},
		[scrollToId]
	);

	const ingredients: TIngredients[] = useAppSelector(selectIngredients);

	const filteredIngredients = useMemo(() => {
		return ingredients.reduce<Record<string, TIngredients[]>>((acc, item) => {
			if (item.type === 'bun') {
				acc.bun = acc.bun || [];
				acc.bun.push(item);
			} else if (item.type === 'sauce') {
				acc.sauce = acc.sauce || [];
				acc.sauce.push(item);
			} else if (item.type === 'main') {
				acc.main = acc.main || [];
				acc.main.push(item);
			}
			return acc;
		}, {} as Record<string, TIngredients[]>);
	}, [ingredients]);

	const bunElements = useMemo(
		() =>
			filteredIngredients.bun?.map((item) => (
				<Ingredient ingredient={item} key={item._id} />
			)) || [],
		[filteredIngredients.bun]
	);

	const sauceElements = useMemo(
		() =>
			filteredIngredients.sauce?.map((item) => (
				<Ingredient ingredient={item} key={item._id} />
			)) || [],
		[filteredIngredients.sauce]
	);

	const mainElements = useMemo(
		() =>
			filteredIngredients.main?.map((item) => (
				<Ingredient ingredient={item} key={item._id} />
			)) || [],
		[filteredIngredients.main]
	);

	return (
		<section className={clsx(styles.section, 'mt-10')}>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>

			<Tabs changeTab={handleTabClick} currentTab={currentTab} tabs={tabs} />

			<ul className={styles.ingredients}>
				<li>
					<IngredientsContainer ref={bunsRef} title={'Булки'} type={TABS.BUN}>
						{bunElements}
					</IngredientsContainer>
				</li>
				<li>
					<IngredientsContainer
						ref={saucesRef}
						title={'Соусы'}
						type={TABS.SAUCE}>
						{sauceElements}
					</IngredientsContainer>
				</li>
				<li>
					<IngredientsContainer
						ref={mainsRef}
						title={'Начинка'}
						type={TABS.MAIN}>
						{mainElements}
					</IngredientsContainer>
				</li>
			</ul>
		</section>
	);
};

export default BurgerIngredients;
