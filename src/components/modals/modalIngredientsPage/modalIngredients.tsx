import ReactDOM from 'react-dom';
import styles from './modalIngredient.module.scss';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
	onClose: () => void;
	title?: string;
	children?: ReactNode;
	isModalOpen?: boolean;
	ariaTitle: string;
}

const ModalIngredient = ({
	children,
	onClose,
	title,
	ariaTitle,
}: ModalProps) => {
	const modalRoot: any = document.getElementById('modal-root');

	const handleOverlayClick = (e: any) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const modalContent = (
		<div onClick={handleOverlayClick} className={styles.madal}>
			<div className={styles.modal__header}>
				{title && (
					<h3
						className={clsx(
							styles.modal__title,
							'text',
							'text_type_main-large'
						)}
						id='modal-title'>
						{title}
					</h3>
				)}
				{!title && (
					<h3 className={clsx(styles.screenReader)} id='aria-title'>
						{ariaTitle}
					</h3>
				)}
				<button
					aria-label='Закрыть модальное окно'
					className={styles.modal__close}
					onClick={onClose}
					type='button'>
					<CloseIcon type='primary' />
				</button>
			</div>
			{children}
		</div>
	);

	return ReactDOM.createPortal(modalContent, modalRoot);
};

export default ModalIngredient;
