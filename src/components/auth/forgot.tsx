import {
	Button,
	EmailInput,	
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import { LOGIN_PATH, RESET_PATH } from '@utils/vars';
import { forgotSlice } from '@services/auth/forgotPassword';
import { USER_RESET } from '@services/auth/actions/forgotPassword';
import Notice from '@components/modals/notice/notice';

const Forgot = () => {
	const { formRef, formState, handleChange } = useForm();

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(forgotSlice.selectors.getForgotIsLiading);
	const hasError = useAppSelector(forgotSlice.selectors.getHasError);
	const requestSuccess = useAppSelector(
		forgotSlice.selectors.getForgotRequestSuccess
	);

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (formState.email) {
			const data = {
				email: formState.email,
			};
			dispatch(USER_RESET(data));
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} ref={formRef}>
				<EmailInput
					onChange={handleChange}
					value={formState.email}
					name='email'
					isIcon={false}
					size='default'
					extraClass='mb-6'
					width='100%'
					autoComplete='on'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass={`mb-10 ${isLoading ? 'button-locked' : ''} ${
						formState.email ? '' : 'button-locked'
					}`}
					style={{ display: 'block', margin: '0 auto 80px' }}>
					Восстановить
				</Button>
				<div style={{ display: 'block', textAlign: 'center' }}>
					<span className={`text text_type_main-default text_color_inactive`}>
						Вспомнили пароль?
					</span>
					<Link
						to={LOGIN_PATH}
						className='text_type_main-default pl-2'
						style={{ cursor: 'pointer' }}>
						Войти
					</Link>
				</div>
			</form>
			{hasError && (
				<Notice text='Такой пользователь уже зарегистрирован' type='error' />
			)}
			{requestSuccess && <Navigate to={RESET_PATH} />}
		</>
	);
};

export default Forgot;
