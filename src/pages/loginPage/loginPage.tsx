import Login from '@components/auth/login';
import styles from './loginPage.module.scss'

const LoginPage = () => {
	return (
		<section className={styles.loginPage}>
			<h3 className='text text_type_main-large mb-6'>Вход</h3>
			<Login />
		</section>
	);
};

export default LoginPage;
