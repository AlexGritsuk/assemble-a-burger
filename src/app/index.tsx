import s from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import MainConstructor from '@components/main-constructor/mainConstructor';
import Modal from '@components/modals/modal/modal';
import ModalOverlay from '@components/modals/modal-overlay/modalOverlay';
import ModalOrder from '@components/modals/modal-order/modalOrder';

export const App = () => {
	return (
		<div className={s.page}>
			<AppHeader />
			<MainConstructor />			
		</div>
	);
};
