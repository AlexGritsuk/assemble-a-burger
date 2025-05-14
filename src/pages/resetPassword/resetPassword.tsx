import styles from './resetPassord.module.scss';
import Reset from '@components/auth/reset';

const ResetPage = () => {
	return (
		<section className={styles.resetPage}>
			<h3 className='text text_type_main-large mb-6'>Вход</h3>
			<Reset />
		</section>
	);
};

export default ResetPage;
