import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { Link, useMatch } from 'react-router-dom';
import { HOME_PATH, PROFILE_PATH } from '@utils/vars';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
	const matchContructor = useMatch('/');    
	
	return (
		<header className={`pt-4 pb-4 ${styles.header}`}>
			<div className={styles.container}>
				<Link className={styles.logo} to={HOME_PATH}>
					<Logo />
				</Link>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li>
							<NavLink
								className={({ isActive }) =>
									`${!isActive ? styles.active : 'text_color_inactive'} ${
										styles.link
									} text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
								}
								to={HOME_PATH}>
								<BurgerIcon type={!matchContructor ? 'primary' : 'secondary'} />
								<span className='ml-2'>Конструктор</span>
							</NavLink>
						</li>
						<li>
							<a
								className={`text_type_main-default mt-4 mb-4  ml-5 mr-5 ${styles.link}`}>
								<ListIcon type='primary' />
								<span className={`ml-2`}>Лента заказов</span>
							</a>
						</li>
						<li className={styles.left}>
							<NavLink
								className={({ isActive }) =>
									`${!isActive ? styles.active : 'text_color_inactive'} ${
										styles.link
									} text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
								}
								to={PROFILE_PATH}>
								<ProfileIcon
									type={matchContructor ? 'primary' : 'secondary'}
								/>
								<span className={`ml-2`}>Личный кабинет</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
