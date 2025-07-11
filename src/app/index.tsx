import ProtectedRoute from '@components/auth/protectedRoute';
import styles from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import ForgotPage from '@pages/forgotPassword/forgotPassword';
import HomePage from '@pages/homePage/homePage';
import LoginPage from '@pages/loginPage/loginPage';
import RegisterPage from '@pages/RegisterPage/registerPage';
import ResetPage from '@pages/resetPassword/resetPassword';
import {
	FEED_ORDER_PATH,
	FEED_PATH,
	FORGOT_PATH,
	HOME_PATH,
	LOGIN_PATH,
	ORDERS_PATH,
	ORDER_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
	RESET_PATH,
} from '@utils/vars';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import IngredientDetailsPage from '@pages/ingredientDetailsPage/ingredientDetailsPage';
import Modal from '@components/modals/modal/modal';
import IngredientDetails from '@components/modals/IngredientDetails/IngredientDetails';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useCallback, useEffect } from 'react';
import {
	closeModal,
	getModalIngredient,
	getModalNotification,
	getModalOrder,
	getModalOrderSuccess,
} from '@services/reducers/modalSlice';
import useAuth from '../hooks/useAuth';
import { selectOrderNumber } from '@services/reducers/orderSlice';
import ModalOrder from '@components/modals/modal-order/modalOrder';
import {
	selectIngredients,
	selectIngredientsFetchRequest,
} from '@services/reducers/ingredientsSlice';
import Loader from '@components/loader/loader';
import NotFoundPage from '@pages/notFound/notFound';
import { selectLoading, setLoading } from '@services/reducers/loadingSlice';
import { fetchIngredients } from '@services/asyncThunk/fetchIngredients';
import { selectGetUser } from '@services/reducers/userSlice';
import { fetchGetUser } from '@services/asyncThunk/fetchGetUser';
import ProfileLayout from '@components/profile/profileLayout';
import ProfileForm from '@components/profile/profileForm/profileForm';
import Notification from '@components/modals/notification/notification';
import ProfileOrders from '@components/profile/profileOrder/profile-orders';
import FeedPage from '@pages/feedPage/feedPage';
import OrderPage from '@pages/orderPage/orderPage';
import OrderDetails from '@components/orderDetails/orderDetails';

export const App = () => {
	const user = useAppSelector(selectGetUser);
	const ingredients = useAppSelector(selectIngredients);
	const ingredientsFetchRequest = useAppSelector(selectIngredientsFetchRequest);
	const loading = useAppSelector(selectLoading);
	let location = useLocation();

	let navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { previousUrl, isTokenExpired } = useAuth();
	const orderNumber = useAppSelector(selectOrderNumber);

	const modalIngredient = useAppSelector(getModalIngredient);
	const modalNotification = useAppSelector(getModalNotification);
	const modalOrder = useAppSelector(getModalOrder);
	const modalOrderSuccess = useAppSelector(getModalOrderSuccess);

	const background =
		modalIngredient || modalOrder ? location?.state?.background : null;

	useEffect(() => {
		dispatch(setLoading({ loading: ingredientsFetchRequest }));
	}, [dispatch, ingredientsFetchRequest]);

	useEffect(() => {
		if (ingredients && ingredients.length === 0) {
			dispatch(fetchIngredients());
		}
		if (
			(!user.isLogout &&
				!user.isLogin &&
				isTokenExpired &&
				user?.token?.refreshToken) ||
			(user.isLogin && (!user.name || !user.email))
		) {
			dispatch(fetchGetUser());
		}
	}, [dispatch, isTokenExpired, user, ingredients, user?.token?.refreshToken]);

	const handleModalClose = useCallback(() => {
		dispatch(closeModal());
		(modalIngredient || modalOrder) &&
			previousUrl &&
			navigate(previousUrl, {
				replace: true,
				state: { background: null },
			});
	}, [dispatch, modalIngredient, modalOrder, navigate, previousUrl]);

	return (
		<div className={styles.page}>
			<AppHeader />
			{loading ? (
				<Loader />
			) : (
				<Routes location={background || location}>
					<Route
						path={HOME_PATH}
						element={
							ingredients.length > 0 && !ingredientsFetchRequest && <HomePage />
						}
					/>

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
						element={
							<ProtectedRoute anonymous={false}>
								<ProfileLayout />
							</ProtectedRoute>
						}
						path={PROFILE_PATH}>
						<Route element={<ProfileForm />} index />
						<Route element={<ProfileOrders />} path={ORDERS_PATH} />
					</Route>

					<Route element={<FeedPage />} path={FEED_PATH} />

					<Route element={<OrderPage />} path={FEED_ORDER_PATH} />

					<Route
						element={
							<ProtectedRoute>
								<OrderPage />
							</ProtectedRoute>
						}
						path={ORDER_PATH}
					/>

					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

					<Route element={<NotFoundPage />} path='*' />
				</Routes>
			)}

			{modalNotification && (
				<Notification
					handleModalClose={handleModalClose}
					title={modalNotification}
				/>
			)}

			<Modal
				ariaTitle={modalOrder ? 'Идентификатор заказа' : ''}
				title={modalIngredient ? 'Детали ингредиента' : ''}
				handleModalClose={handleModalClose}
				isModalOpen={!!modalIngredient || !!modalOrder || !!modalOrderSuccess}>
				{background && modalIngredient && (
					<IngredientDetails ingredient={modalIngredient} />
				)}
				{background && modalOrder && <OrderDetails order={modalOrder} />}
				{orderNumber && modalOrderSuccess && <ModalOrder />}
			</Modal>
		</div>
	);
};
