import {
	getWebsocket,
	wsConnectionClosed,
	wsConnectionStart,
} from '@services/reducers/wsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { WSS_ALL_ORDERS } from '@utils/vars';
import Loader from '@components/loader/loader';
import styles from './feedPage.module.scss';
import OrderList from '@components/order-list/order-list';
import OrderData from '@components/order-data/order-data';

const FeedPage = () => {
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector(getWebsocket);

	useEffect(() => {
		dispatch(wsConnectionStart(`${WSS_ALL_ORDERS}`));
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch]);

	return orders ? (
		<div className={styles.container}>
			<h2 className='text text_type_main-large'>Лента заказов</h2>
			<section className={styles.feed}>
				<OrderList />
				<OrderData />
			</section>
		</div>
	) : (
		<Loader />
	);
};

export default FeedPage;
