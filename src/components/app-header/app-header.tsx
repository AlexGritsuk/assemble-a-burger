import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';

export const AppHeader = () => (

	

	<header className={`pt-4 pb-4 ${s.header}`}>
		<div className={s.container}>
			<a className={s.logo} href='#'>
				<Logo />
			</a>
			<nav className={s.nav}>
				<ul className={s.list}>
					<li>
						<a
							className={`text_type_main-default mt-4 mb-4 ml-5 mr-5 ${s.link}`}>
							<BurgerIcon type='primary' />
							<span className={`ml-2`}>Конструктор</span>
						</a>
					</li>
					<li>
						<a
							className={`text_type_main-default mt-4 mb-4  ml-5 mr-5 ${s.link}`}>
							<ListIcon type='primary' />
							<span className={`ml-2`}>Лента заказов</span>
						</a>
					</li>
					<li className={s.left}>
						<a
							className={`text_type_main-default mt-4 mb-4 ml-5 mr-5 ${s.link}`}>
							<ProfileIcon type='primary' />
							<span className={`ml-2`}>Личный кабинет</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>
);
