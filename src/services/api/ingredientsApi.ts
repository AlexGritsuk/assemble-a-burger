import { IngredientsPromise } from '@utils/types';
import { request } from '../helpers/request';

export const getIngredients = () =>
	request('ingredients') as Promise<IngredientsPromise>; 
 