import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './services/store';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { userInfoSlice } from '@services/auth/userInfo';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface initialProps {
	name: string;
	email: string;
	password: string;
	code: string;
}

export const useForm = () => {
	const [isDisabledNameInput, setDisabledNameInput] = useState(true);

	const formRef = useRef<HTMLFormElement>(null);
	const refNameInput = useRef<HTMLInputElement>(null);

	const userName = useAppSelector(userInfoSlice.selectors.getUserName);
	const userEmail = useAppSelector(userInfoSlice.selectors.getUserEmail);

	let initialSate: initialProps = {
		name: '',
		email: '',
		password: '',
		code: '',
	};

	const [formState, setFormState] = useState(initialSate);

	useEffect(() => {
		setFormState({
			...formState,
			name: userName,
			email: userEmail,
		});
	}, [userEmail, userName]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleReset = (e: { preventDefault: () => void }) => {
		setFormState(initialSate);
	};

	const unlockNameInput = () => {
		setTimeout(() => refNameInput.current?.focus(), 0);
		setDisabledNameInput(false);
	};
	const lockNameInput = () => {
		setDisabledNameInput(true);
	};

	return {
		formRef,
		formState,
		handleChange,
		handleReset,
		refNameInput,
		isDisabledNameInput,
		unlockNameInput,
		lockNameInput,
	};
};
