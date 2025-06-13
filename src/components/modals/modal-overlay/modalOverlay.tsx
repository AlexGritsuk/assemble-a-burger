import { useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';

import styles from './modalOverlay.module.scss';
import { useAppSelector } from '../../../hooks/hooks';
import {
	getModalIngredient,
	getModalOrder,
	getModalOrderSuccess,
	modalSlice,
} from '@services/reducers/modalSlice';

interface modalOverlayProps {
	handleModalClose: () => void;
}

const ModalOverlay = ({ handleModalClose }: modalOverlayProps) => {
	const modalIngredient = useAppSelector(getModalIngredient);
	const modalOrder = useAppSelector(getModalOrder);
	const modalOrderSuccess = useAppSelector(getModalOrderSuccess);

	const handleEscape = useCallback(
		(e: KeyboardEvent) => e.key === 'Escape' && handleModalClose(),
		[handleModalClose]
	);

	const isModalOpen = useMemo(
		() => !!modalIngredient || !!modalOrder || !!modalOrderSuccess,
		[modalIngredient, modalOrder, modalOrderSuccess]
	);

	useEffect(() => {
		if (!isModalOpen) {
			return;
		}
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [handleEscape, isModalOpen]);

	return (
		<div
			className={clsx(styles.modal__overlay, {
				[styles.modal__overlay_opened]: isModalOpen,
			})}
			onClick={handleModalClose}
			tabIndex={1}></div>
	);
};

export default ModalOverlay;
