import Login from '@components/auth/login/login';
import styles from './loginPage.module.scss';

const LoginPage = () => {
	return (
		<section className={styles.loginPage}>			
			<Login />
		</section>
	);
};

export default LoginPage;
