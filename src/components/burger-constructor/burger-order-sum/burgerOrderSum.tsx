import { useState } from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerOrder from './burgerOrderSum.module.scss';
import Modal from '@components/modals/modal/modal';
import ModalOrder from '@components/modals/modal-order/modalOrder';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { orderSlice } from '@services/reducers/order';
import { ORDER_REQUEST, ORDER_RESET } from '@services/actions/order';
import { TIngredients } from '@utils/types';
import { ORDERS } from '@utils/vars';
import TotalPrice from '@components/common/totalPrice';

interface BurgerOrderSumProps {
	INGR: TIngredients[];
	BUN: TIngredients;
}

const BurgerOrderSum = ({ INGR, BUN }: BurgerOrderSumProps) => {
	const [isModalActive, setModalActive] = useState(false);

	const dispatch = useAppDispatch();

	const isLoading = useAppSelector(orderSlice.selectors.getOrderLoading);
	const hasError = useAppSelector(orderSlice.selectors.getOrderError);
	const requestSuccess = useAppSelector(orderSlice.selectors.gerOrderSuccess);

	const getOrderAPI = () => {
		let arr: string[] = INGR.map((el: TIngredients) => el._id);
		arr.push(BUN._id, BUN._id);
		let sendData = {
			URL: ORDERS,
			bodySend: {
				ingredients: arr,
			},
		};
		dispatch(ORDER_REQUEST(sendData));
	};

	const handleModalOpen = () => {
		BUN && INGR.length > 0 && getOrderAPI();
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
		dispatch(ORDER_RESET());
	};

	return (
		<div className={`mt-10 mr-4 ${burgerOrder.inner}`}>
			<TotalPrice />
			<CurrencyIcon type='primary' />
			<div className='ml-10'>
				<Button
					onClick={handleModalOpen}
					htmlType='button'
					type='primary'
					size='medium'>
					Оформить заказ
				</Button>
				<div>
					{isModalActive && (
						<div>
							<Modal title='' onClose={handleModalClose}>
								{!isLoading && !hasError && !requestSuccess && (
									<div>Вы не добавили ингредиентов</div>
								)}
								{isLoading && <div>Loading...</div>}
								{hasError && <div>Ошибка</div>}
								{!isLoading && !hasError && requestSuccess && <ModalOrder />}
							</Modal>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BurgerOrderSum;
