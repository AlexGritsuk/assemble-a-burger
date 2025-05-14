import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import { FORGOT_PATH, LOGIN_PATH } from '@utils/vars';
import { forgotSlice } from '@services/auth/forgotPassword';
import { USER_RESET_CONFIRM } from '@services/auth/actions/forgotPassword';
import Notice from '@components/modals/notice/notice';

const Reset = () => {
	const { formRef, formState, handleChange } = useForm();
	const dispatch = useAppDispatch();

	const isLoading = useAppSelector(
		forgotSlice.selectors.getResetConfirmIsLiading
	);
	const hasError = useAppSelector(
		forgotSlice.selectors.getResetConfirmHasError
	);
	const requestSuccess = useAppSelector(
		forgotSlice.selectors.getResetConfirmRequestSuccess
	);

	const resetRequestSuccess = useAppSelector(
		forgotSlice.selectors.getForgotRequestSuccess
	);

	const isFormFilled = formState.password && formState.code;

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (isFormFilled) {
			const data = {
				password: formState.password,
				token: formState.code,
			};
			dispatch(USER_RESET_CONFIRM(data));
		}
	};

	return (
		<>
			{!resetRequestSuccess && <Navigate to={FORGOT_PATH} />}

			{resetRequestSuccess && (
				<form ref={formRef} onSubmit={handleSubmit}>
					<PasswordInput
						onChange={handleChange}
						value={formState.password}
						name='password'
						placeholder='Введите новый пароль'
						size='default'
						extraClass='mb-6'
						autoComplete='on'
					/>
					<Input
						type='text'
						placeholder='Введите код из письма'
						onChange={handleChange}
						value={formState.code}
						name='code'
						error={false}
						errorText='Ошибка'
						size='default'
						extraClass='mb-6'
						autoComplete='on'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-10'
						style={{ display: 'block', margin: '0 auto 80px' }}>
						{isLoading ? 'Загрузка' : 'Сохранить'}
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
			)}
			{hasError && <Notice text='Указан неверный код' type='error' />}
			{requestSuccess && <Navigate to={LOGIN_PATH} />}
		</>
	);
};

export default Reset;
