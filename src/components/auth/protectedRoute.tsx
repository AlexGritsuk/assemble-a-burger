import { JSX, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userInfoSlice } from '@services/auth/userInfo';

import { useAppSelector } from '../../hooks';
import { HOME_PATH, LOGIN_PATH } from '@utils/vars';
import { loginSlice } from '@services/auth/login';
import { logoutSlice } from '@services/auth/logOut';

type Props = {
	anonymous?: boolean;
	children?: ReactNode;
};

const ProtectedRoute = ({
	anonymous = false,
	children,
}: Props): JSX.Element => {
	const user = useAppSelector(userInfoSlice.selectors.getUser);
	const isLogin = useAppSelector(loginSlice.selectors.getLoginIsLiading);
	const isLoginSuccess = useAppSelector(
		loginSlice.selectors.getLoginRequestSuccess
	);
	const isLogout = useAppSelector(logoutSlice.selectors.getLogOutIsLiading);
	const location = useLocation();
	const from = location?.state?.from || HOME_PATH;

	console.log('user: ', user);
	console.log('isLogin', isLogin);
	console.log('anonymous', anonymous);
	console.log('isLoginSuccess', isLoginSuccess);
	console.log('isLogout', isLogout);

	if (anonymous && isLogin) {
		return <Navigate replace={true} to={from} />;
	}

	if (!anonymous && !isLogin && isLogout) {
		return <Navigate to={HOME_PATH} />;
	}

	if (!anonymous && !isLogin) {
		return (
			<Navigate replace={true} state={{ from: location }} to={LOGIN_PATH} />
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
