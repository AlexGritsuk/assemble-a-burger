import styles from './forgotPassword.module.scss';
import Forgot from '@components/auth/forgot/forgot';

const ForgotPage = () => {
	return (
		<section className={styles.forgotPage}>			
			<Forgot />
		</section>
	);
};

export default ForgotPage;
