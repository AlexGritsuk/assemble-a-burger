import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerOrder from './burgerOrderSum.module.scss';
import { useState } from 'react';
import Modal from '@components/modals/modal/modal';
import ModalOrder from '@components/modals/modal-order/modalOrder';

const BurgerOrderSum = () => {
	const [isModalActive, setModalActive] = useState(false);

	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};

	return (
		<div className={`mt-10 mr-4 ${burgerOrder.inner}`}>
			<span className='text text_type_digits-medium mr-2'>1234</span>
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
								<ModalOrder />
							</Modal>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BurgerOrderSum;
