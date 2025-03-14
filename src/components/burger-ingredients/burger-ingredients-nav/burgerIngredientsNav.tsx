import React from 'react';
import nav from './burger-ingredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsNav = () => {
	const [current, setCurrent] = React.useState('one');
	return (
		<div style={{ display: 'flex' }}>
			<Tab value='one' active={current === 'one'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value='two' active={current === 'two'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value='three' active={current === 'three'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);
};

export default BurgerIngredientsNav;
