import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
	getWebsocket,
	wsConnectionClosed,
	wsConnectionStart,
} from '@services/reducers/wsSlice';
import OrderList from '@components/order-list/order-list';
import Loader from '@components/loader/loader';
import { WSS_PROFILE_ORDERS } from '@utils/vars';
import { selectGetUser } from '@services/reducers/userSlice';

const ProfileOrders = () => {
	const { orders } = useAppSelector(getWebsocket);
	const user = useAppSelector(selectGetUser);
	const tokenWithoutBearer = user.token.accessToken?.replace('Bearer ', '');
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			wsConnectionStart(`${WSS_PROFILE_ORDERS}?token=${tokenWithoutBearer}`)
		);
		return () => {
			dispatch(wsConnectionClosed());
		};
	}, [dispatch, tokenWithoutBearer]);

	return <>{orders ? <OrderList /> : <Loader />}</>;
};

export default ProfileOrders;
