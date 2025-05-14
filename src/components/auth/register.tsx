import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { Link } from 'react-router-dom';
import { LOGIN_PATH } from '@utils/vars';
import { registerSlice } from '@services/auth/register';
import { USER_REGISTER } from '@services/auth/actions/register';
import Notice from '@components/modals/notice/notice';

const Register = () => {
	const { formRef, formState, handleChange } = useForm();

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(registerSlice.selectors.getForgotIsLiading);
	const hasError = useAppSelector(registerSlice.selectors.getHasError);

	const isFormFilled = formState.name && formState.email && formState.password;

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (isFormFilled) {
			const data = {
				email: formState.email,
				password: formState.password,
				name: formState.name,
			};
			dispatch(USER_REGISTER(data));
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} ref={formRef}>
				<Input
					type='text'
					placeholder='Имя'
					onChange={handleChange}
					value={formState.name}
					name='name'
					error={false}
					errorText='Ошибка'
					size='default'
					extraClass='mb-6'
					autoComplete='on'
				/>
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
				<PasswordInput
					onChange={handleChange}
					value={formState.password}
					name='password'
					size='default'
					extraClass='mb-6'
					autoComplete='on'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass={`mb-10 ${isLoading ? 'button-locked' : ''} ${
						isFormFilled ? '' : 'button-locked'
					}`}>
					{isLoading ? 'Загрузка' : 'Зарегистрироваться'}
				</Button>
				<div style={{ display: 'block', textAlign: 'center' }}>
					<span className={`text text_type_main-default text_color_inactive`}>
						Уже зарегистрированы?
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
		</>
	);
};

export default Register;
