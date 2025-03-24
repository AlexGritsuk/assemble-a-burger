import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cat from './burgerCategory.module.scss';
import { useState } from 'react';
import Modal from '@components/modals/modal/modal';
import ModalInfo from '@components/modals/modal-info/modalInfo';

interface BurgerCategoryProps {
	name: string;
	price: number;
	image: string;
	calories: number;
	proteins: number;
	carbohydrates: number;
	fat: number;
}

const BurgerCategory = (props: BurgerCategoryProps) => {
	const [isModalActive, setModalActive] = useState(false);

	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};
	return (
		<div style={{ cursor: 'pointer' }}>
			<a onClick={handleModalOpen} href='#' className={`mb-8 ${cat.link}`}>
				<img
					className={`${cat.img} pl-4 pr-4 mb-1`}
					src={props.image}
					alt='Краторная булка'
				/>
				<p className={`${cat.price} text text_type_digits-default mb-1`}>
					{props.price}
					<CurrencyIcon type='primary' />
				</p>
				<p className={`${cat.name} text text_type_main-default`}>
					{props.name}
				</p>
			</a>
			<div>
				{isModalActive && (
					<div>
						<Modal title='Детали ингредиента' onClose={handleModalClose}>
							<ModalInfo {...props} />
						</Modal>
					</div>
				)}
			</div>
		</div>
	);
};

export default BurgerCategory;
