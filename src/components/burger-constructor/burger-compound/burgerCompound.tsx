import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerCompound from './burgerCompound.module.scss';
import { useEffect, useState } from 'react';
import { data } from '@utils/data';

interface DataProps {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

const BurgerCompound = (data: any) => {		

	const ingredients = data.burgerData.filter(
		(el: DataProps) => el.type !== 'bun'
	);

	return (
		<div className={burgerCompound.compoundList}>
			<div className={burgerCompound.inner}>
				<div>
					{ingredients.map((ingredient: DataProps) => (
						<div key={ingredient._id} className={`pb-4 ${burgerCompound.item}`}>
							<span className={burgerCompound.dragIcon}>
								<DragIcon type='primary' />
							</span>
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BurgerCompound;
