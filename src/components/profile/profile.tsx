import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { userInfoSlice } from '@services/auth/userInfo';
import { updateSlice } from '@services/auth/update';
import { USER_UPDATE } from '@services/auth/actions/update';
import Notice from '@components/modals/notice/notice';

const Profile = () => {
	const dispatch = useAppDispatch();
	const userName = useAppSelector(userInfoSlice.selectors.getUserName);
	const userEmail = useAppSelector(userInfoSlice.selectors.getUserEmail);
	const userUpdateIsLoading = useAppSelector(
		updateSlice.selectors.getUpdateIsLoading
	);

	const userUpdateHasError = useAppSelector(
		updateSlice.selectors.getUpdateHasError
	);
	const userUpdateRequestSuccess = useAppSelector(
		updateSlice.selectors.getUpdateSuccess
	);
	const {
		formRef,
		formState,
		handleChange,
		handleReset,
		refNameInput,
		isDisabledNameInput,
		unlockNameInput,
		lockNameInput,
	} = useForm();

	const isFormChange =
		userName !== formState.name ||
		userEmail !== formState.email ||
		formState.password;

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (isFormChange) {
			const data = {
				name: formState.name,
				email: formState.email,
				password: formState.password,
			};
			dispatch(USER_UPDATE(data));
			handleReset(e);
		}
	};
	return (
		<>
			<form ref={formRef} onSubmit={handleSubmit}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleChange}
					value={formState.name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size='default'
					icon={'EditIcon'}
					disabled={isDisabledNameInput}
					ref={refNameInput}
					onIconClick={unlockNameInput}
					onBlur={lockNameInput}
					extraClass='mb-6'
					autoComplete='on'
				/>
				<EmailInput
					onChange={handleChange}
					value={formState.email}
					name={'email'}
					isIcon={true}
					size='default'
					extraClass='mb-6'
					width='100%'
					autoComplete='on'
				/>
				<PasswordInput
					onChange={handleChange}
					value={formState.password}
					name={'password'}
					size='default'
					icon={'EditIcon'}
					extraClass='mb-6'
					autoComplete='on'
				/>
				<span>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass={`mb-2 ${isFormChange ? '' : 'button-locked'} ${
							userUpdateIsLoading ? 'button-locked' : ''
						}`}
						onClick={handleReset}>
						Отмена
					</Button>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass={`mb-2 ${isFormChange ? '' : 'button-locked'} ${
							userUpdateIsLoading ? 'button-locked' : ''
						}`}>
						{userUpdateIsLoading ? 'Загрузка' : 'Сохранить'}
					</Button>
				</span>
			</form>
			{userUpdateRequestSuccess && <Notice text='Данные успешно обновлены' />}
			{userUpdateHasError && <Notice text='Произошла ошибка' type='error' />}
		</>
	);
};

export default Profile;
