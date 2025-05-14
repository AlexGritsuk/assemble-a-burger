import { ReactNode } from 'react';
import ModalOverlay from '../modal-overlay/modalOverlay';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
	closeModal: () => void;
	title?: string;
	children: ReactNode;
}

function Modal(props: {
	closeModal: () => void;
	title?: string;
	children: ReactNode;
}) {
	return ReactDOM.createPortal(
		<>
			<div className={`${styles.modal} p-10 pb-15`}>
				<div className={styles.header}>
					<h3 className={`${styles.title} text text_type_main-large`}>
						{props.title}
					</h3>
					<span
						className={`${styles.modal__close} remove-select`}
						onClick={props.closeModal}>
						<CloseIcon type='primary' />
					</span>
				</div>
				<div className={styles.content}>{props.children}</div>
			</div>
			<ModalOverlay closeModal={props.closeModal} />
		</>,
		document.getElementById('modals') as HTMLElement
	);
}

export default Modal;
