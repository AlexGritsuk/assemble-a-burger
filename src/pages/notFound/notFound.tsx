import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './notFound.module.css';
import { HOME_PATH } from '@utils/vars';

const NotFoundPage = () => {
	return (
		<section className={styles.container}>
			<article className={styles.article}>
				<p className='text text_type_digits-large'>404</p>
				<p className='text text_type_main-default'>
					К сожалению, такой страницы не существует в этой вселенной!
				</p>
			</article>
			<Link to={HOME_PATH}>
				<Button htmlType='button' size='medium' type='primary'>
					Вернуться на главную страницу
				</Button>
			</Link>
		</section>
	);
};

export default NotFoundPage;
