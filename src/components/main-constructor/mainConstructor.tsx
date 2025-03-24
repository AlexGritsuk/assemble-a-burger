import { useState, useEffect } from 'react';
import BurgerConstructor from '@components/burger-constructor/burgerConstructor';
import BurgerIngredients from '@components/burger-ingredients/burgerIngredients';
import mainConstructor from './mainConstructor.module.scss';

const MainConstructor = () => {
	const [data, setData] = useState({
		burgerData: [],
		loading: false,
	});

	useEffect(() => {
		const getProductData = async () => {
			setData({ ...data, loading: false });
			try {
				const res = await fetch(
					'https://norma.nomoreparties.space/api/ingredients'
				);
				if (!res.ok) {
					throw new Error('Ответ сети был не ok');
				}
				const product = await res.json();
				setData({
					burgerData: product.data,
					loading: true,
				});
			} catch (error: any) {
				console.log(
					'Возникла проблема с вашим fetch запросом: ',
					error.message
				);
			}
		};
		getProductData();
	}, []);

	return (
		<main className={`${mainConstructor.main} pt-10 pl-5 pr-5`}>
			{data.loading ? (
				<section className={mainConstructor.mainConstructor}>
					<BurgerIngredients dataBurger={data.burgerData} />
					<BurgerConstructor dataBurger={data.burgerData} />
				</section>
			) : (
				'Loading'
			)}
		</main>
	);
};

export default MainConstructor;
