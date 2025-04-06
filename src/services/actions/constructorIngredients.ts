import { createAction } from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import { TIngredients } from '@utils/types';

type TPayloadIngredient = {
	payload: TIngredients;
};

type TPayloadMove = { payload: { fromIndex: number; toIndex: number } };

export const INGREDIENTS_ADD = createAction(
	'INGREDIENTS_ADD',
	function prepare(item: TIngredients): TPayloadIngredient {
		return {
			payload: {
				...item,
				uuid: uuid(),
			},
		};
	}
);

export const INGREDIENTS_DELETE = createAction(
	'INGREDIENTS_DELETE',
	function prepare(item: TIngredients): TPayloadIngredient {
		return {
			payload: {
				...item,
			},
		};
	}
);

export const INGREDIENTS_RESET = createAction('INGREDIENTS_RESET');

export const INGREDIENTS_MOVE = createAction(
	'INGREDIENTS_MOVE',
	function prepare(fromIndex: number, toIndex: number): TPayloadMove {
		return {
			payload: {
				fromIndex,
				toIndex,
			},
		};
	}
);
