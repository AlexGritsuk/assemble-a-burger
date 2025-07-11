import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './orderPage.module.css';
import { fetchGetOrder } from '@services/asyncThunk/createOrder';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '@components/loader/loader';
import NotFoundPage from '@pages/notFound/notFound';
import OrderDetails from '@components/orderDetails/orderDetails';
import { selectOrderData } from '@services/reducers/orderSlice';

const OrderPage = () => {
	const order = useAppSelector(selectOrderData);
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		params.id && dispatch(fetchGetOrder(+params.id));
	}, [dispatch, params.id]);

	return order === null ? (
		<Loader />
	) : order ? (
		<section className={styles.section}>
			<OrderDetails order={order} />
		</section>
	) : (
		<NotFoundPage />
	);
};

export default OrderPage;
