import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './homePage.module.scss';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';

const HomePage = () => {
	return (
		<main className={`${styles.main} pt-10 pl-5 pr-5`}>
			<section className={styles.mainConstructor}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</section>
		</main>
	);
};

export default HomePage;
