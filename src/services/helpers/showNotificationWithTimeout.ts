import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
	closeModal,
	setModalNotification,
} from '@services/reducers/modalSlice';
import { AppDispatch } from '@services/store';

export const showNotificationWithTimeout = (
	content: string,
	dispatch: AppDispatch,
	setMessage: ActionCreatorWithPayload<boolean>
) => {
	dispatch(setMessage(true));
	dispatch(setModalNotification(content));
	setTimeout(() => {
		dispatch(setMessage(false));
		dispatch(closeModal());
	}, 4000);
};
