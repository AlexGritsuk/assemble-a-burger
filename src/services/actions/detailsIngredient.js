import { createAction } from '@reduxjs/toolkit';
import { TIngredients } from '@utils/types';

// type TPayloadIngredient = {
// 	payload: TIngredients;
// };

export const DETAILS_ADD = createAction(
	'DETAILS__ADD',
	function prepare(item) {
		return {
			payload: {
				...item,
			},
		};
	}
);

export const DETAILS_RESET = createAction('DETAILS_RESET');
