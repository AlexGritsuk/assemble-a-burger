import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { Link } from 'react-router-dom';
import { FORGOT_PATH, REGISTER_PATH } from '@utils/vars';
import { loginSlice } from '@services/auth/login';
import { USER_LOGIN } from '@services/auth/actions/login';
import Notice from '@components/modals/notice/notice';

const Login = () => {
	const { formRef, formState, handleChange } = useForm();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(loginSlice.selectors.getLoginIsLiading);
	const hasError = useAppSelector(loginSlice.selectors.getLoginHasError);

	const isFormFill = formState.email && formState.password;
	const handleSubmit = (e: { preventDefault: () => void }) => {
		if (isFormFill) {
			const data = {
				email: formState.email,
				password: formState.password,
			};
			dispatch(USER_LOGIN(data));
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
					extraClass='mb-6'
					width='100%'
					autoComplete='on'
				/>
				<PasswordInput
					onChange={handleChange}
					value={formState.password}
					name='password'
					extraClass='mb-6'
					autoComplete='on'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass={`mb-10 ${isLoading ? 'button-locked' : ''} ${
						isFormFill ? '' : 'button-locked'
					}`}>
					{isLoading ? 'Загрузка' : 'Войти'}
				</Button>
				<div style={{ display: 'block', textAlign: 'center' }} className='mb-4'>
					<span className={`text text_type_main-default text_color_inactive`}>
						Вы - новый пользователь?
					</span>
					<Link
						to={REGISTER_PATH}
						className='text_type_main-default pl-2'
						style={{ cursor: 'pointer' }}>
						Зарегистрироваться
					</Link>
				</div>
				<div style={{ display: 'block', textAlign: 'center' }}>
					<span className={`text text_type_main-default text_color_inactive`}>
						Забыли пароль?
					</span>
					<Link
						to={FORGOT_PATH}
						className='text_type_main-default pl-2'
						style={{ cursor: 'pointer' }}>
						Восстановить пароль
					</Link>
				</div>
			</form>
			{hasError && <Notice text='Неверный логин или пароль' type='error' />}
		</>
	);
};

export default Login;
