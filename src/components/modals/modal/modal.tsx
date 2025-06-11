import { ReactNode } from 'react';
import ModalOverlay from '../modal-overlay/modalOverlay';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

interface ModalProps {
	handleModalClose: () => void;
	title?: string;
	children?: ReactNode;
	isModalOpen: boolean;
	ariaTitle: string;
}

const Modal = ({
	handleModalClose,
	ariaTitle,
	title,
	children,
	isModalOpen,
}: ModalProps) => {
	return createPortal(
		<>
			{
				<>
					<ModalOverlay handleModalClose={handleModalClose} />
					<div
						className={clsx(styles.modal, {
							[styles.modal_opened]: isModalOpen,
						})}
						aria-labelledby={title ? 'modal-title' : 'aria-title'}
						aria-modal={isModalOpen ? 'true' : 'false'}
						onClick={(e) => e.stopPropagation()}
						role='dialog'>
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
								onClick={handleModalClose}
								type='button'>
								<CloseIcon type='primary' />
							</button>
						</div>
						{children}
					</div>
				</>
			}
		</>,
		document.querySelector('#modal') as HTMLDivElement
	);
};

export default Modal;
