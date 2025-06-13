import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, useForm } from '../../../hooks/hooks';
import { FormEvent, useEffect } from 'react';
import { LOGIN_PATH, RESET_PATH } from '@utils/vars';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot.module.scss';
import { selectForgotPasswordRequest, selectIsEmailSubmitted } from '@services/reducers/passwordSlice';
import { fetchForgotPassword } from '@services/asyncThunk/fetchForgotPassword';
import { NavLink } from 'react-router-dom';

const Forgot = () => {
	const { errors, handleChange, isValid, resetForm, values } = useForm();
	const dispatch = useAppDispatch();

	const forgotPasswordRequest = useAppSelector(
		selectForgotPasswordRequest
	);

	const isEmailSubmitted = useAppSelector(
		selectIsEmailSubmitted
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (isEmailSubmitted) navigate(RESET_PATH);
	}, [navigate, isEmailSubmitted]);

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (values.email) {
			dispatch(fetchForgotPassword({ email: values.email }));
		}
	};

	return (
		<section className={styles.container}>
			<form className={styles.login_form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium'>
					Восстановление пароля
				</h1>
				<Input
					error={!!errors.email}
					errorText={errors.email}
					extraClass={clsx(styles.input_error)}
					name={'email'}
					onChange={handleChange}
					placeholder={'E-mail'}
					required
					size={'default'}
					type={'email'}
					value={values.email || ''}
				/>
				<Button
					disabled={!isValid || forgotPasswordRequest.fetch}
					htmlType='submit'
					size='medium'
					type='primary'>
					Восстановить
				</Button>
			</form>
			<ul className={clsx('page__list', styles.list)}>
				{forgotPasswordRequest.errorMessage && (
					<li className={clsx('text', 'text_type_main-small', styles.item)}>
						<span className={clsx(styles.plain_text, styles.error_text)}>
							{forgotPasswordRequest.errorMessageContent}
						</span>
					</li>
				)}
				<li className={clsx('text', 'text_type_main-small', styles.item)}>
					<span className={styles.plain_text}>Вспомнили пароль?</span>
					<NavLink className={styles.app_link} to={LOGIN_PATH}>
						Войти
					</NavLink>
				</li>
			</ul>
		</section>
	);
};

export default Forgot;
