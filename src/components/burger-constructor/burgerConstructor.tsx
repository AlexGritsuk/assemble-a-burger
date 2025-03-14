import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import borgerConstructor from './burgerConstructor.module.scss';
import BurgerCompound from './burger-compound/burgerCompound';
import BurgerOrderSum from './burger-order-sum/burgerOrderSum';
import React from 'react';

const BurgerConstructor = () => {
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
		<div className={`pt-15 pb-10 ${borgerConstructor.inner}`}>
			{data.loading ? (
				<div className={borgerConstructor.list}>
					<div className='mr-4 ml-10'>
						<ConstructorElement
							type='top'
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={200}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>
					<div className={`mt-4 mb-4 pr-4 pl-10 ${borgerConstructor.compound}`}>
						<BurgerCompound {...data} />
					</div>
					<div className='mr-4 ml-10'>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text='Краторная булка N-200i (низ)'
							price={200}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>
				</div>
			) : (
				'Loading'
			)}

			<BurgerOrderSum />
		</div>
	);
};

export default BurgerConstructor;
