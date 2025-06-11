import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { getModalNotification } from '@services/reducers/modalSlice';
import styles from './notification.module.css';

type Props = {
	children?: ReactNode;
	handleModalClose: () => void;
	title: string;
};

const Notification = ({ children, handleModalClose, title }: Props) => {
	const modalNotification = useAppSelector(getModalNotification);
	const isNotificationOpen = useMemo(
		() => !!modalNotification,
		[modalNotification]
	);

	const modalRoot = document.querySelector('#modal') as HTMLDivElement | null;

	if (!modalRoot) {
		console.error('Modal root element not found');
		return null;
	}

	return createPortal(
		<div
			className={clsx(styles.notification, {
				[styles.notification_opened]: isNotificationOpen,
			})}
			role='dialog'
			aria-modal={isNotificationOpen}
			onClick={handleModalClose}
			aria-labelledby='modal-title'
			onKeyDown={(e) => e.stopPropagation()}
		>
			<div
				className={styles.notification__content}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.notification__header}>
					<h3
						className={clsx(
							styles.notification__title,
							'text',
							'text_type_main-default'
						)}
						id='modal-title'>
						{title}
					</h3>
					<button
						aria-label='Закрыть модальное окно'
						className={styles.notification__close}
						onClick={handleModalClose}
						type='button'>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</div>,
		modalRoot
	);
};

export default Notification;
