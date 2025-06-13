import styles from './resetPassord.module.scss';
import Reset from '@components/auth/reset/reset';

const ResetPage = () => {
	return (
		<section className={styles.resetPage}>			
			<Reset />
		</section>
	);
};

export default ResetPage;
