import Register from '@components/auth/register/register';
import styles from './registerPage.module.scss';

const RegisterPage = () => {
	return (
		<section className={styles.registerPage}>			
			<Register />
		</section>
	);
}

export default RegisterPage;
