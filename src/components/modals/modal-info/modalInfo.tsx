import modal from './modalInfo.module.scss';

interface ModalInfoProps {
	image: string;
	name: string;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
}

const ModalInfo = (props: ModalInfoProps) => {
	return (
		<div className={`${modal.content}`}>
			<div className={modal.inner}>
				<img
					className={`mt-4 mb-4 ${modal.img}`}
					src={props.image}
					alt='Ингредиент'
				/>
				<p className='text text_type_main-medium mb-8'>{props.name}</p>
				<ul className={`text_color_inactive ${modal.nutritional}`}>
					<li className='mr-10'>
						<p className='text text_type_main-default mb-3'>Калории,ккал</p>
						<p className='text text_type_digits-default'>{props.calories}</p>
					</li>
					<li className='mr-10'>
						<p className='text text_type_main-default mb-3'>Белки,г</p>
						<p className='text text_type_digits-default'>{props.proteins}</p>
					</li>
					<li className='mr-10'>
						<p className='text text_type_main-default mb-3'>Жиры,г</p>
						<p className='text text_type_digits-default'>{props.fat}</p>
					</li>
					<li>
						<p className='text text_type_main-default mb-3'>Углеводы,г</p>
						<p className='text text_type_digits-default'>
							{props.carbohydrates}
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ModalInfo;
