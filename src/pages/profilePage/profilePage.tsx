import Profile from '@components/profile/profile';
import styles from './profilePage.module.scss'

export default function ProfilePage() {
	return (		
			<section className={styles.profilePage}>
				<h3 className='text text_type_main-large mb-6'>Профиль</h3>
				<Profile/>
			</section>
		
	);
} 
