import { Outlet } from 'react-router-dom';
import styles from './profileLayout.module.scss';
import ProfileNav from '@components/profileNav/profileNav';

export default function ProfileLayoutPage() {
	return (
		<section className={`pt-20 ${styles.profilePage}`}>
			<ProfileNav />
			<Outlet />
		</section>
	);
}
