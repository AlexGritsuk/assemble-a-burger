import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import order from './modalOrder.module.scss';
import { useAppSelector } from '../../../hooks';
import { orderSlice } from '@services/reducers/order';

const ModalOrder = () => {
	const orderNum = useAppSelector(orderSlice.selectors.getOrderNumber);
	return (
		<>
			<div className={`${order.content}`}>
				<div className={order.inner}>
					<p className='text text_type_digits-large pb-8'>{orderNum}</p>
					<p className='text text_type_main-medium'>Индификатор заказа</p>
					<span className='pb-15 pt-15'>
						<CheckMarkIcon type='primary' />
					</span>
					<p className='text text_type_main-small pb-2'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-small text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			</div>
		</>
	);
};

export default ModalOrder;
