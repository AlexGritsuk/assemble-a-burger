import Register from '@components/auth/register';
import styles from "./registerPage.module.scss"

const RegisterPage = () => {
	return (
		<section className={styles.registerPage}>
			<h3 className='text text_type_main-large mb-6'>
				Регистрация
			</h3>
			<Register />
		</section>
	);
};

export default RegisterPage;
