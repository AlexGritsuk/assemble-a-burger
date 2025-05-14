import { PROFILE_PATH } from '@utils/vars';
import { NavLink } from 'react-router-dom';
import styles from './profileNav.module.scss';
import { useAppDispatch } from '../../hooks';
import { USER_LOGOUT } from '@services/auth/actions/logOut';

const ProfileNav = () => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(USER_LOGOUT());
		location.reload();			
	};

	return (
		<nav className={`mr-15 ${styles.nav}`}>
			<ul className={styles.nav__list}>
				<li className={`${styles.nav__list_item}`}>
					<NavLink
						className={({ isActive }) =>
							`${isActive ? styles.active : 'text_color_inactive'} 
              ${styles.link} text ${'text_type_main-medium'}`
						}
						to={PROFILE_PATH}
						end={true}>
						Профиль
					</NavLink>
				</li>
				<li className={`${styles.nav__list_item}`}>
					<NavLink
						className={({ isActive }) =>
							`${isActive ? styles.active : 'text_color_inactive'} 
              ${styles.link} text ${'text_type_main-medium'}`
						}
						to={PROFILE_PATH}>
						История заказов
					</NavLink>
				</li>
				<li className={`${styles.nav__list_item}  mb-20`}>
					<span
						className={`${
							styles.link
						} text_color_inactive  text ${'text_type_main-medium'}`}
						onClick={handleLogout}>
						Выход
					</span>
				</li>
			</ul>
			<span className='text text_type_main-default text_color_inactive'>
				В этом разделе вы можете изменить свои персональные данные
			</span>
		</nav>
	);
};

export default ProfileNav;
