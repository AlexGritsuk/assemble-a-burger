import modal from './modalInfo.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getIngredientsById } from '@services/reducers/ingredients';

const ModalInfo = () => {
	const { id } = useParams();
	const details2 = useAppSelector(getIngredientsById(id));	

	return (
		<div className={`${modal.content}`}>
			{details2 ? (
				<div className={modal.inner}>
					<img
						className={`mt-4 mb-4 ${modal.img}`}
						src={details2.image}
						alt='Ингредиент'
					/>
					<p className='text text_type_main-medium mb-8'>{details2.name}</p>
					<ul className={`text_color_inactive ${modal.nutritional}`}>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Калории,ккал</p>
							<p className='text text_type_digits-default'>
								{details2.calories}
							</p>
						</li>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Белки,г</p>
							<p className='text text_type_digits-default'>
								{details2.proteins}
							</p>
						</li>
						<li className='mr-10'>
							<p className='text text_type_main-default mb-3'>Жиры,г</p>
							<p className='text text_type_digits-default'>{details2.fat}</p>
						</li>
						<li>
							<p className='text text_type_main-default mb-3'>Углеводы,г</p>
							<p className='text text_type_digits-default'>
								{details2.carbohydrates}
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
