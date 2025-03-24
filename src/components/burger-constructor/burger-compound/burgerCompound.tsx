import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerCompound from './burgerCompound.module.scss';
import { TConstructor, TburgerData } from '@utils/types';

const BurgerCompound = ({ dataBurger }: TConstructor) => {
	return (
		<div className={burgerCompound.compoundList}>
			<div className={burgerCompound.inner}>
				<div>
					{dataBurger
						.filter((el: TburgerData) => el.type !== 'bun')
						.map((ingredient: TburgerData) => (
							<div
								key={ingredient._id}
								className={`pb-4 ${burgerCompound.item}`}>
								<span className={burgerCompound.dragIcon}>
									<DragIcon type='primary' />
								</span>
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default BurgerCompound;
