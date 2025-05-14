import styles from './forgotPassword.module.scss';
import Forgot from '@components/auth/forgot';

const ForgotPage = () => {
	return (
		<section className={styles.forgotPage}>
			<h3 className='text text_type_main-large mb-6'>Восстановление пароля</h3>
			<Forgot />
		</section>
	);
};

export default ForgotPage;
