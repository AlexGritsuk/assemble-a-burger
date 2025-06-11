import clsx from 'clsx';
import { TIngredients } from '@utils/types';
import styles from './IngredientDetails.module.scss';

interface IngredientDetailsProps {
	ingredient: TIngredients;
}

const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
	return (
		<div className={styles.ingredientDetail}>
			<picture className={styles.ingredientDetail__picture}>				
				<img
					alt={ingredient.name}
					className={styles.ingredientDetail__image}
					src={ingredient.image}
				/>
			</picture>
			<div className={clsx(styles.ingredientDetail__content, 'mt-4')}>
				<h4
					className={clsx(
						styles.ingredientDetail__title,
						'text',
						'text_type_main-medium'
					)}>
					{ingredient.name}
				</h4> 
				<div
					className={clsx(
						styles.ingredientDetail__nutritionFacts,
						'mt-8',
						'text',
						'text_type_main-default',
						'text_color_inactive'
					)}>
					<span>Калории,ккал</span>
					<span>Белки, г</span>
					<span>Жиры, г</span>
					<span>Углеводы, г</span>
					<span className={'text_type_digits-default'}>
						{ingredient.calories}
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.proteins}
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.fat}
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
