import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useForm } from '../../../hooks/hooks';
import clsx from 'clsx';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.scss';
import { fetchRegister } from '@services/asyncThunk/fetchRegister';
import {
	selectRegisterErrorMessage,
	selectRegisterFetch,
	selectRegisterMessageContent,
} from '@services/reducers/registerSlice';
import { NavLink } from 'react-router-dom';
import { LOGIN_PATH } from '@utils/vars';

const RegisterPage = () => {
	const { errors, handleChange, isValid, resetForm, values } = useForm();
	const dispatch = useAppDispatch();
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const errorMessage = useAppSelector(selectRegisterErrorMessage);
	const errorMessageContent = useAppSelector(selectRegisterMessageContent);
	const fetch = useAppSelector(selectRegisterFetch);

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (values.email && values.password && values.name) {
			dispatch(
				fetchRegister({
					email: values.email,
					name: values.name,
					password: values.password,
				})
			);
		}
	};

	return (
		<section className={styles.container}>
			<form className={styles.login_form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					error={!!errors.name}
					errorText={errors.name}
					extraClass={styles.input_error}
					maxLength={20}
					minLength={2}
					name={'name'}
					onChange={handleChange}
					placeholder={'Имя'}
					required
					size={'default'}
					type={'text'}
					value={values.name || ''}
				/>
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
					minLength={8}
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
					Зарегистрироваться
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
					<span className={styles.plain_text}>Уже зарегистрированы?</span>
					<NavLink className={styles.app_link} to={LOGIN_PATH}>
						Войти
					</NavLink>
				</li>
			</ul>
		</section>
	);
};

export default RegisterPage;
