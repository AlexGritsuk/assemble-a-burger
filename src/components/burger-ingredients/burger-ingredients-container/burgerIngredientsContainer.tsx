import { useState, useEffect } from 'react';
import burgerIngredientsContainer from './burgerIngredientsContainer.module.scss';
import BurgerCategory from './burger-category/burgerCategory';
import React from 'react';

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

const BurgerIngredientsContainer = () => {
	const [data, setData] = React.useState<any>({
		burgerData: [],
		loading: false,
	});

	React.useEffect(() => {
		const getProductData = async () => {
			setData({ ...data, loading: false });
			const res = await fetch(
				'https://norma.nomoreparties.space/api/ingredients'
			);
			const product = await res.json();
			setData({
				burgerData: product.data,
				loading: true,
			});
		};
		getProductData();
	}, []);	

	return (
		<div className={burgerIngredientsContainer.scroll}>
			<div className={burgerIngredientsContainer.inner}>
				{data.loading ? (
					<div>
						<h2 className='text text_type_main-medium mb-6 pt-6'>Булки</h2>
						<div className={burgerIngredientsContainer.category}>
							{data.burgerData
								.filter((el: DataProps) => el.type === 'bun')
								.map((bun: DataProps) => (
									<BurgerCategory key={bun._id} {...bun} />
								))}
						</div>
						<h2 className='text text_type_main-medium mb-6 pt-6'>Соусы</h2>
						<div className={burgerIngredientsContainer.category}>
							{data.burgerData
								.filter((el: DataProps) => el.type === 'sauce')
								.map((sauce: DataProps) => (
									<BurgerCategory key={sauce._id} {...sauce} />
								))}
						</div>
						<h2 className='text text_type_main-medium mb-6 pt-6'>Начинки</h2>
						<div className={burgerIngredientsContainer.category}>
							{data.burgerData
								.filter((el: DataProps) => el.type === 'main')
								.map((main: DataProps) => (
									<BurgerCategory key={main._id} {...main} />
								))}
						</div>
					</div>
				) : (
					'Loading'
				)}
			</div>
		</div>
	);
};

export default BurgerIngredientsContainer;
