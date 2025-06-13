import { useAppSelector } from '../../hooks/hooks';
import { Outlet, useLocation } from 'react-router-dom';
import ProfileMenu from './profileMenu/profileMenu';
import { selectGetUser, userSlice } from '@services/reducers/userSlice';
import styles from './profileLayout.module.scss';
import { HOME_PATH, PROFILE_PATH } from '@utils/vars';
import Loader from '@components/loader/loader';

const ProfileLayout = () => {
	const user = useAppSelector(selectGetUser);
	const location = useLocation();

	return user.isLogin ? (
		<div className={styles.container}>
			<aside className={styles.aside}>
				<ProfileMenu />
				<>
					{location.pathname === PROFILE_PATH && (
						<p className='text text_type_main-default	text_color_inactive'>
							В&nbsp;этом&nbsp;разделе вы можете изменить
							свои&nbsp;персональные&nbsp;данные
						</p>
					)}
					{location.pathname === HOME_PATH && (
						<p className='text text_type_main-default text_color_inactive'>
							В&nbsp;этом&nbsp;разделе вы можете просмотреть
							свою&nbsp;историю&nbsp;заказов
						</p>
					)}
				</>
			</aside>
			<section className={styles.section}>
				<Outlet />
			</section>
		</div>
	) : (
		<Loader />
	);
};

export default ProfileLayout;
