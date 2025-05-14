import ProtectedRoute from '@components/auth/protectedRoute';
import styles from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import ForgotPage from '@pages/forgotPassword/forgotPassword';
import HomePage from '@pages/homePage/homePage';
import LoginPage from '@pages/loginPage/loginPage';
import ProfileLayoutPage from '@pages/profileLayout/profileLayout';
import ProfilePage from '@pages/profilePage/profilePage';
import RegisterPage from '@pages/RegisterPage/registerPage';
import ResetPage from '@pages/resetPassword/resetPassword';
import {
	ALL_PATH,
	FORGOT_PATH,
	HOME_PATH,
	ID_PATH,
	INGREDIENTS_PATH,
	LOGIN_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
	RESET_PATH,
} from '@utils/vars';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import IngredientDetailsPage from '@pages/ingredientDetailsPage/ingredientDetailsPage';
import Modal from '@components/modals/modal/modal';
import ModalInfo from '@components/modals/modal-info/modalInfo';
import { USER_CHECK_AUTH } from '@services/auth/actions/checkAuth';
import { useAppDispatch } from '../hooks';
import { useEffect } from 'react';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(USER_CHECK_AUTH());
	}, [dispatch]);

	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };

	let navigate = useNavigate();
	const closeModal = () => {
		navigate(-1);
	};
	
	return (
		<div className={styles.page}>
			<AppHeader />
			<Routes location={state?.backgroundLocation || location}>
				<Route path={HOME_PATH} element={<HomePage />} />
				<Route
					path={LOGIN_PATH}
					element={
						<ProtectedRoute anonymous={true}>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path={REGISTER_PATH}
					element={
						<ProtectedRoute anonymous={true}>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path={FORGOT_PATH}
					element={
						<ProtectedRoute anonymous={true}>
							<ForgotPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path={RESET_PATH}
					element={
						<ProtectedRoute anonymous={true}>
							<ResetPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path={PROFILE_PATH}
					element={
						<ProtectedRoute anonymous={false}>
							<ProfileLayoutPage />
						</ProtectedRoute>
					}>
					<Route index element={<ProfilePage />} />
				</Route>

				<Route
					path={INGREDIENTS_PATH + ID_PATH}
					element={<IngredientDetailsPage />}
				/>
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route
						path={INGREDIENTS_PATH + ID_PATH}
						element={
							<Modal closeModal={() => closeModal()} title='Детали ингредиента'>
								<ModalInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
