import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import styles from './orderDetails.module.css';
import { Order, TIngredients } from '@utils/types';
import { useAppSelector } from '../../hooks/hooks';
import { selectIngredients } from '@services/reducers/ingredientsSlice';

type Props = {
  order: Order
}

const OrderDetails = ({ order }: Props) => {
  const date = new Date(order.createdAt);
  const ingredients = useAppSelector(selectIngredients);
 const ingredientsArray = useMemo(() => {
		const result: TIngredients[] = [];
		for (const id of order.ingredients) {
			const ingredient = ingredients.find((i) => i._id === id);
			if (ingredient) {
				result.push(ingredient);
			} else {
				console.warn(`Ингредиент с id ${id} не найден`);				
			}
		}
		return result;
 }, [ingredients, order.ingredients]);
  const sortArray = useMemo(
    () => ingredientsArray.reduce((acc: TIngredients[], item) => {
      if (acc.find(i => i._id === item._id)) {
        return acc.map((value) =>
          (value.quantity && value._id === item._id)
            ? { ...value, quantity: value.quantity + 1 }
            : value);
      }

      return [...acc, { ...item, quantity: 1 }];
    }, []),
    [ingredientsArray]);
  const checkTotalPrice = useCallback(
		(ingredientsArray: TIngredients[]) =>
			ingredientsArray.reduce((prev, current) => prev + current.price, 0),
		[]
	);

  const ingredientList = sortArray.map(
    (item, index) => (
      <li key={index}>
        <div className={clsx(styles.ingredients_item)}>
          <img
            alt={`Ингредиент ${item.name}`}
            className={`${styles.ingredients_image} `}
            src={item.image}
          />

          <h5 className={`text text_type_main-default ${styles.ingredients_title}`}>{item.name}</h5>
          <div className={styles.ingredients_price}>
            <p className={'text text_type_digits-default'}>
              {item.quantity}&#160;x&#160;{item.price}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    ),
  );

  return (
    <div className={styles.page}>
      <h2 className={clsx(styles.numbers, 'text', 'text_type_digits-default')}>
        #{order.number}
      </h2>
      <div className={styles.content}>
        <h3 className={clsx('text', 'text_type_main-medium')}>
          {order.name}
        </h3>
        <p
          className={clsx(
            'text',
            'text_type_main-default',
            'mt-3',
            styles.status,
            { [styles.status_done]: order.status === 'done' }
          )}>
          {order.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
        <h4
          className={clsx('mt-15', 'text', 'text_type_main-medium')}
        >
          Состав:
        </h4>
        <ul
          className={clsx(styles.ingredients_list, 'page__list', 'mt-6')}
        >
          {ingredientList}
        </ul>
      </div>

      <div className={clsx(styles.footer)}>
        <FormattedDate
          className={clsx('text', 'text_type_main-default', 'text_color_inactive')}
          date={date}
        />
        <span className={styles.price}>
          <span className={clsx('text', 'text_type_digits-default')}>
            {checkTotalPrice(ingredientsArray)}
          </span>
          <CurrencyIcon type="primary"/>
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
