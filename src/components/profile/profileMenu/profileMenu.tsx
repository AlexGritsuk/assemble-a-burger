import clsx from 'clsx';
import { useLogout } from '../../../hooks/useLogout';
import styles from './profileMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { HOME_PATH, ORDERS, ORDERS_PATH, PROFILE_PATH } from '@utils/vars';

const ProfileMenu = () => {
	const { handleLogout } = useLogout();

	return (
		<nav>
			<ul className={clsx('page__list', styles.list)}>
				<li className={clsx(styles.item)}>
					<NavLink
						className={({ isActive }) =>
							clsx(
								isActive ? styles.link_active : styles.link,
								'page__link',
								'text',
								'text_type_main-medium'
							)
						}
						end
						to={PROFILE_PATH}>
						Профиль
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						className={({ isActive }) =>
							clsx(
								isActive ? styles.link_active : styles.link,
								'page__link',
								'text',
								'text_type_main-medium'
							)
						}
						end
						to={ORDERS_PATH}>
						История заказов
					</NavLink>
				</li>
				<li className={styles.item}>
					<button
						className={clsx(
							styles.link,
							styles.button,
							'page__link',
							'text',
							'text_type_main-medium'
						)}
						onClick={handleLogout}>
						Выход
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default ProfileMenu;
