import { selectIngredients } from '@services/reducers/ingredientsSlice';
import { useAppSelector } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '@components/modals/IngredientDetails/IngredientDetails';
import { memo } from 'react';
import clsx from 'clsx';
import Loader from '@components/loader/loader';
import { TIngredients } from '@utils/types';
import styles from './ingredientDetailsPage.module.scss';

const IngredientDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const ingredients = useAppSelector(selectIngredients);
	const ingredient = ingredients.find((item: TIngredients) => item._id === id);
	if (!id) {
		return <div>Ингредиент не найден</div>;
	}

	if (!ingredients) {
		return <Loader />;
	}

	if (!ingredient) {
		return (
			<div
				className={clsx(
					styles.notFoundIngredient,
					'text',
					'text_type_main-large'
				)}>
				Ингредиент не найден
			</div>
		);
	}

	return (
		<>
			<section className={styles.ingredientDetailsPage}>
				<h3 className={`text text_type_main-large mt-30`}>
					Детали ингредиента
				</h3>
				<IngredientDetails ingredient={ingredient} />
			</section>
		</>
	);
};

export default memo(IngredientDetailsPage);
