import { constructorIngredientsSlice } from '@services/reducers/constructorIngredientsSlice';
import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';

const TotalPrice = () => {
	const ingredients = useAppSelector(
		constructorIngredientsSlice.selectors.getconstructorIngredients
	);

	const count = useMemo(() => { 
		let count = 0;
		if (ingredients.bun) {
			count += ingredients.bun.price * 2;
		}
		if (ingredients.ingr) {
			count += ingredients.ingr.reduce((acc, elem) => acc + elem.price, 0);
		}
		return count;
	}, [ingredients]);

	return <span className='text text_type_digits-medium mr-2'>{count}</span>;
};

export default TotalPrice;
