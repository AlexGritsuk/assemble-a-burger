import {
	getIngredientsById,
	ingredientsSlice,
} from '@services/reducers/ingredients';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import ModalInfo from '@components/modals/modal-info/modalInfo';
import { memo, useMemo } from 'react';

const IngredientDetailsPage = () => {
	const { id } = useParams();
	const ingredients = useAppSelector(ingredientsSlice.selectors.getAllItems);
	const ingredient = useMemo(
		() => ingredients.find((item) => item._id === id),
		[id, ingredients]
	);
	// const ingredientDetails = useAppSelector(getIngredientsById(id));

	console.log('ingredient', ingredient);

	// const requestSuccess = useAppSelector(
	// 	ingredientsSlice.selectors.getItemsRequestSuccess
	// );
	return (
		<>
			{ingredient ? (
				<>
					<h3 className={`text text_type_main-large align-center mt-10`}>
						Детали ингредиента
					</h3>
					<ModalInfo />
				</>
			) : (
				<div>Загрузка</div>
			)}
		</>
	);
};

export default memo(IngredientDetailsPage);
