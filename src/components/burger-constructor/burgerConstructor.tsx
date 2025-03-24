import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import borgerConstructor from './burgerConstructor.module.scss';
import BurgerCompound from './burger-compound/burgerCompound';
import BurgerOrderSum from './burger-order-sum/burgerOrderSum';
import { TConstructor } from '@utils/types';

const BurgerConstructor = ({ dataBurger }: TConstructor) => {
	return (
		<div className={`pt-15 pb-10 ${borgerConstructor.inner}`}>
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
					<BurgerCompound dataBurger={dataBurger} />
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

			<BurgerOrderSum />
		</div>
	);
};

export default BurgerConstructor;
