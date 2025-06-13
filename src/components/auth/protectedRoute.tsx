import { HOME_PATH, LOGIN_PATH } from '@utils/vars';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectGetUser } from '@services/reducers/userSlice';
import { ReactNode } from 'react';

type Props = {
	anonymous?: boolean;
	children?: ReactNode;
};

const ProtectedRoute = ({
	anonymous = false,
	children,
}: Props): JSX.Element => {
	const user = useAppSelector(selectGetUser);
	const location = useLocation();
	const from = location?.state?.from || HOME_PATH;

	if (anonymous && user.isLogin) {
		return <Navigate replace={true} to={from} />;
	}

	if (!anonymous && !user.isLogin && user.isLogout) {
		return <Navigate to={HOME_PATH} />;
	}

	if (!anonymous && !user.isLogin) {
		return (
			<Navigate replace={true} state={{ from: location }} to={LOGIN_PATH} />
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
