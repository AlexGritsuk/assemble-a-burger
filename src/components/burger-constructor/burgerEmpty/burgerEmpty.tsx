import styles from './burgerEmpty.module.scss';

interface BurgerEmptyProps {
	isLocked?: boolean;
	position?: 'top' | 'bottom';
	type: string;
	isHover?: boolean;
	canDrop?: boolean;
}

const BurgerEmpty = ({
	position,
	type,
	isHover = false,
	canDrop = false,
}: BurgerEmptyProps) => {
	return (
		<span className='mr-2 ml-6'>
			<div
				className={`${styles.empty}
          ${position === 'top' ? styles.empty_pos_top : ''}
          ${position === 'bottom' ? styles.empty_pos_bottom : ''}
          ${styles.drop__target}
          ${isHover ? styles.drop__hover : ''}
          ${canDrop ? styles.drop__can : ''}`}>
				<span className={styles.empty_row}>
					<span className={styles.empty_title}>
						{type === 'bun' ? 'Выбери булку' : 'Выбери начинку'}
					</span>
				</span>
			</div>
		</span>
	);
};

export default BurgerEmpty;
