import burgerConstructor from './burgerConstructor.module.scss';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BurgerEmpty from './burger-empty/burgerEmpty';
import { constructorIngredientsSlice } from '@services/reducers/constructorIngredientsSlice';
import { INGREDIENTS_MOVE } from '@services/actions/constructorIngredients';
import BurgerElement from './burger-element/burgerElement';
import { TIngredients } from '@utils/types';
import BurgerOrderSum from './burger-order-sum/burgerOrderSum';
import { userInfoSlice } from '@services/auth/userInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BurgerConstructor = () => {
	const dispatch = useAppDispatch();

	const constructorList = useAppSelector(
		constructorIngredientsSlice.selectors.getconstructorIngredients
	);

	const BUN = constructorList.bun;
	const INGR = constructorList.ingr;

	const user = useAppSelector(userInfoSlice.selectors.getUser);
	const navigate = useNavigate();
	const location = useLocation();



	const findItem = (id: string) => {
		const item = INGR.filter((el) => `${el.uuid}` === id)[0];
		return {
			item,
			index: INGR.indexOf(item),
		};
	};

	const moveItem = (id: string, toIndex: number) => {
		const { index } = findItem(id);
		dispatch(INGREDIENTS_MOVE(index, toIndex));
	};

	const [, drop] = useDrop(() => ({ accept: 'ingr' }));

	return (
		<section className={`pt-15 pb-10 ${burgerConstructor.inner}`}>
			<div className={burgerConstructor.list}>
				{BUN ? (
					<BurgerElement
						ingredient={BUN}
						isLocked={true}
						position='top'
						type='bun'
						moveItem={moveItem}
						findItem={findItem}
					/>
				) : (
					<BurgerEmpty isLocked={true} position='top' type='bun' />
				)}
				<div className={`${burgerConstructor.scroll} mt-4 mb-4`}>
					<div>
						{INGR.length > 0 ? (
							<>
								<span ref={drop} className={burgerConstructor.span}>
									{INGR.map((el: TIngredients, uuid: number, index) => (
										<BurgerElement
											key={uuid}
											ingredient={el}
											isLocked={false}
											type='ingredients'
											moveItem={moveItem}
											findItem={findItem}
										/>
									))}
								</span>
							</>
						) : (
							<BurgerEmpty isLocked={false} type='ingredients' />
						)}
					</div>
				</div>
				{BUN ? (
					<BurgerElement
						ingredient={BUN}
						isLocked={true}
						position='bottom'
						type='bun'
						moveItem={moveItem}
						findItem={findItem}
					/>
				) : (
					<BurgerEmpty isLocked={true} position='bottom' type='bun' />
				)}
			</div>
			<div className={`mt-10 mr-4 ${burgerConstructor.sum}`}>
				<BurgerOrderSum INGR={INGR} BUN={BUN} />
			</div>
		</section>
	);
};

export default BurgerConstructor;
