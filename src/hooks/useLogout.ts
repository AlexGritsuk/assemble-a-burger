import { getCookie } from '@services/helpers/getCookie';
import { useAppDispatch, useAppSelector } from './hooks';
import { useCallback } from 'react';
import { selectGetUser, userSlice } from '@services/reducers/userSlice';
import { REFRESH_TOKEN } from '@utils/vars';
import { fetchLogout } from '@services/asyncThunk/fetchLogout';

export const useLogout = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectGetUser);

	const refreshToken = getCookie(REFRESH_TOKEN);
	const handleLogout = useCallback(
		() =>
			user.isLogin &&
			refreshToken &&
			dispatch(fetchLogout({ token: refreshToken })),
		[dispatch, user.isLogin, refreshToken]
	);

	return { handleLogout };
};
