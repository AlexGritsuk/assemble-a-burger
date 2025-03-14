import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import Portal, { createContainer } from '../portal/portal';
import modal from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modalOverlay';

const MODAL_CONTAINER_ID = 'modal-container-id';

interface ModalProps {
	title: string;
	onClose?: () => void;
	children: React.ReactNode | React.ReactNode[];
}

const Modal = ({ title, onClose, children }: ModalProps) => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID });
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};
		window.addEventListener('keydown', handleEscapePress);
		return () => {
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	return isMounted ? (
		<Portal id={MODAL_CONTAINER_ID}>
			<div className={modal.wrap}>
				<div className={`pt-30 ${modal.content}`}>
					<button onClick={onClose} className={`mt-15 mr-10 ${modal.close}`}>
						<CloseIcon type='primary' />
					</button>
					<p className={`text text_type_main-large mt-15 ml-10 ${modal.title}`}>
						{title}
					</p>

					{children}
				</div>
			</div>
			<ModalOverlay close={onClose} />
		</Portal>
	) : null;
};

export default Modal;
