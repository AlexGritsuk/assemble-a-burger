import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useForm } from '../../../hooks/hooks';
import {
	selectLoginErrorMessage,
	selectLoginErrorMessageContent,
	selectLoginFetchStatus,
} from '@services/reducers/loginSlice';
import { fetchLogin } from '@services/asyncThunk/fetchLogin';
import clsx from 'clsx';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './login.module.scss';
import { FORGOT_PATH, REGISTER_PATH } from '@utils/vars';

const Login = () => {
	const { errors, handleChange, isValid, resetForm, values } = useForm();
	const dispatch = useAppDispatch();
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const errorMessage = useAppSelector(selectLoginErrorMessage);
	const errorMessageContent = useAppSelector(selectLoginErrorMessageContent);
	const fetch = useAppSelector(selectLoginFetchStatus);

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (values.email && values.password) {
				dispatch(
					fetchLogin({
						email: values.email,
						password: values.password,
					})
				);
			}
		},
		[dispatch, values.email, values.password]
	);

	return (
		<section className={styles.container}>
			<form className={styles.login_form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<Input
					error={!!errors.email}
					errorText={errors.email}
					extraClass={styles.input_error}
					name={'email'}
					onChange={handleChange}
					placeholder={'E-mail'}
					required
					size={'default'}
					type={'email'}
					value={values.email || ''}
				/>
				<Input
					error={!!errors.password}
					errorText={errors.password}
					extraClass={styles.input_error}
					icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
					maxLength={20}
					minLength={1}
					name={'password'}
					onChange={handleChange}
					onIconClick={onIconClick}
					placeholder={'Пароль'}
					required
					size={'default'}
					type={isVisiblePassword ? 'text' : 'password'}
					value={values.password || ''}
				/>
				<Button
					disabled={!isValid || fetch}
					htmlType='submit'
					size='medium'
					type='primary'>
					Войти
				</Button>
			</form>
			<ul className={clsx('page__list', styles.list)}>
				{errorMessage && (
					<li className={clsx('text', 'text_type_main-small', styles.item)}>
						<span className={clsx(styles.plain_text, styles.error_text)}>
							{errorMessageContent}
						</span>
					</li>
				)}
				<li className={clsx('text', 'text_type_main-small', styles.item)}>
					<span className={styles.plain_text}>Вы — новый пользователь?</span>
					<NavLink className={styles.app_link} to={REGISTER_PATH}>
						Зарегистрироваться
					</NavLink>
				</li>
				<li className={clsx('text', 'text_type_main-small', styles.item)}>
					<span className={styles.plain_text}>Забыли пароль?</span>
					<NavLink className={styles.app_link} to={FORGOT_PATH}>
						Восстановить пароль
					</NavLink>
				</li>
			</ul>
		</section>
	);
};

export default Login;
