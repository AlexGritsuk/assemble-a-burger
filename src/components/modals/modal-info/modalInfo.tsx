import { TIngredients } from '@utils/types';
import modal from './modalInfo.module.scss';

interface detailsProps {
	details: TIngredients | null;
}

const ModalInfo = ({ details }: detailsProps) => {
	return (
		<div className={`${modal.content}`}>
			{details ? (
				<div className={modal.inner}>
					<img
						className={`mt-4 mb-4 ${modal.img}`}
						src={details.image}
						alt='Ингредиент'
					/>
					<p className='text text_type_main-medium mb-8'>{details.name}</p>
					<ul className={`text_color_inactive ${modal.nutritional}`}>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Калории,ккал</p>
							<p className='text text_type_digits-default'>
								{details.calories}
							</p>
						</li>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Белки,г</p>
							<p className='text text_type_digits-default'>
								{details.proteins}
							</p>
						</li>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Жиры,г</p>
							<p className='text text_type_digits-default'>{details.fat}</p>
						</li>
						<li>
							<p className='text text_type_main-default mb-3'>Углеводы,г</p>
							<p className='text text_type_digits-default'>
								{details.carbohydrates}
							</p>
						</li>
					</ul>
				</div>
			) : (
				'Loading'
			)}
		</div>
	);
};

export default ModalInfo;
