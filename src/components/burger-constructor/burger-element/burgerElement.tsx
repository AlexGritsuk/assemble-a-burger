import { TIngredients } from '@utils/types';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burgerElement.module.scss';
import {
	CurrencyIcon,
	DeleteIcon,
	DragIcon,
	LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../hooks';

import {
	INGREDIENTS_ADD,
	INGREDIENTS_DELETE,
} from '@services/actions/constructorIngredients';

interface BurgerElementProps {
	ingredient: TIngredients;
	isLocked?: boolean;
	position?: 'top' | 'bottom';
	type: string;
	moveItem: (id: string, to: number) => void;
	findItem: (id: string) => { index: number };
}

const BurgerElement = ({
	ingredient,
	isLocked,
	position,
	type,
	moveItem,
	findItem,
}: BurgerElementProps) => {
	const dispatch = useAppDispatch();

	const [{ isOver, canDrop }, dropTarget] = useDrop({
		accept: type,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		drop(item) {
			dispatch(INGREDIENTS_ADD(item as TIngredients));
		},
	});

	const deleteIngredient = () => {
		dispatch(INGREDIENTS_DELETE(ingredient));
	};

	const uuid = ingredient.uuid;
	const uuIndex = findItem(uuid).index;
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: 'ingr',
			item: { uuid, uuIndex },
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
			end: (item, monitor) => {
				const { uuid: droppedId, uuIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveItem(droppedId, uuIndex);
				}
			},
		}),
		[ingredient.uuid, uuIndex, moveItem]
	);

	const [, drop] = useDrop(
		() => ({
			accept: 'ingr',
			hover({ uuid: draggedId }: any) {
				if (draggedId !== uuid) {
					const { index: overIndex } = findItem(uuid);
					moveItem(draggedId, overIndex);
				}
			},
		}),
		[findItem, moveItem]
	);

	return (
		<>
			<span ref={(node) => drag(drop(node))} style={{ opacity }} className=''>
				<article
					className={`mr-4 ml-10 ${styles.element_article}`}
					ref={dropTarget}>
					{!isLocked && ingredient && (
						<span className={`${styles.drag_icon}`}>
							<DragIcon type='secondary' />
						</span>
					)}
					<div
						className={`${styles.element} 
						${position === 'top' ? styles.element_pos_top : ''} 
						${position === 'bottom' ? styles.element_pos_bottom : ''} 
						${styles.drop__target}          
         				${isOver ? styles.drop__hover : ''}
          				${canDrop ? styles.drop__can : ''}
					`}>
						<span className={styles.element_row}>
							{ingredient ? (
								<>
									<img
										className={styles.element_image}
										src={ingredient.image}
										alt={ingredient.name}
									/>
									<span className={styles.element_text}>{ingredient.name}</span>
									<span className={styles.element_price}>
										{ingredient.price}
										<span className='pl-2'>
											<CurrencyIcon type='primary' />
										</span>
										{isLocked ? (
											<span className='pl-2'>
												<LockIcon type='secondary' />
											</span>
										) : (
											<span className={`pl-2 ${styles.delete__icon}`}>
												<DeleteIcon
													type='secondary'
													onClick={deleteIngredient}
												/>
											</span>
										)}
									</span>
								</>
							) : (
								<span className={styles.empty__text}>
									{type === 'bun' ? 'Выбери булку' : 'Выбери начинку'}
								</span>
							)}
						</span>
					</div>
				</article>
			</span>
		</>
	);
};

export default BurgerElement;
