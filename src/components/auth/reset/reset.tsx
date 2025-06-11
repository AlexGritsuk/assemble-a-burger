import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useForm } from '../../../hooks/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { FORGOT_PATH, LOGIN_PATH } from '@utils/vars';
import {
	selectIsEmailSubmitted,
	selectIsPasswordChanged,
	selectResetPassowordRequest,
} from '@services/reducers/passwordSlice';
import { fetchResetPassword } from '@services/asyncThunk/fetchResetPassword';
import styles from './reset.module.scss';
import clsx from 'clsx';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const ResetPasswordPage = () => {
	const { errors, handleChange, isValid, resetForm, values } = useForm();
	const dispatch = useAppDispatch();
	const isEmailSubmitted = useAppSelector(selectIsEmailSubmitted);
	const isPasswordChanged = useAppSelector(selectIsPasswordChanged);
	const resetPasswordRequest = useAppSelector(selectResetPassowordRequest);
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const onIconClick = useCallback(
		() => setIsVisiblePassword((prev) => !prev),
		[]
	);

	useEffect(() => {
		if (!isEmailSubmitted) {
			const { pathname } = location;
			if (pathname !== FORGOT_PATH) {
				navigate(FORGOT_PATH, { state: { background: pathname } });
			}
		} else if (isPasswordChanged) {
			const { pathname } = location;
			if (pathname !== LOGIN_PATH) {
				navigate(LOGIN_PATH, { state: { background: pathname } });
			}
		}
	}, [isEmailSubmitted, isPasswordChanged, location, navigate]);

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (values.password && values.token) {
			dispatch(
				fetchResetPassword({
					password: values.password.toString(),
					token: values.token.trim(),
				})
			);
		}
	};

	return (
		<section className={clsx(styles.container)}>
			<form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
				<h1 className={clsx('text', 'text_type_main-medium')}>
					Восстановление пароля
				</h1>
				<Input
					error={!!errors.password}
					errorText={errors.password}
					extraClass={clsx(styles.input_error)}
					icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
					maxLength={20}
					minLength={8}
					name={'password'}
					onChange={handleChange}
					onIconClick={onIconClick}
					placeholder={'Введите новый пароль'}
					required
					size={'default'}
					type={isVisiblePassword ? 'text' : 'password'}
					value={values.password || ''}
				/>
				<Input
					error={!!errors.token}
					errorText={errors.token}
					extraClass={styles.input_error}
					name={'token'}
					onChange={handleChange}
					placeholder={'Введите код из письма'}
					size={'default'}
					type={'text'}
					value={values.token || ''}
				/>
				<Button
					disabled={!isValid || resetPasswordRequest.fetch}
					htmlType='submit'
					size='medium'
					type='primary'>
					Сохранить
				</Button>
			</form>
			<ul className={clsx('page__list', styles.list)}>
				{resetPasswordRequest.errorMessage && (
					<li className={clsx('text', 'text_type_main-small', styles.item)}>
						<span className={clsx(styles.plain_text, styles.error_text)}>
							{resetPasswordRequest.errorMessageContent}
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

export default ResetPasswordPage;
