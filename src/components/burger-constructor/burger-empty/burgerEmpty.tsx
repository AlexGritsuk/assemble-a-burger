import styles from './burgerEmpty.module.scss';
import { useAppDispatch } from '../../../hooks';
import { useDrop } from 'react-dnd';
import { INGREDIENTS_ADD } from '@services/actions/constructorIngredients';
import { TIngredients } from '@utils/types';

interface BurgerEmptyProps {
	isLocked?: boolean;
	position?: 'top' | 'bottom';	
	type: string;
}

const BurgerEmpty = ({ position, type }: BurgerEmptyProps) => {
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

	return (
		<>
			<span ref={dropTarget} className={`${'mr-4 ml-10'}`}>
				<div
					className={`${styles.empty} 
						${position === 'top' ? styles.empty_pos_top : ''} 
						${position === 'bottom' ? styles.empty_pos_bottom : ''} 
						${styles.drop__target}          
         				${isOver ? styles.drop__hover : ''}
          				${canDrop ? styles.drop__can : ''}
					`}>
					<span className={styles.empty_row}>
						<span className={styles.empty_title}>
							{type === 'bun' ? 'Выбери булку' : 'Выбери начинку'}
						</span>
					</span>
				</div>
			</span>
		</>
	);
};

export default BurgerEmpty;
