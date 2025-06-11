import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { PATTERN_EMAIL } from '@utils/vars';
import { ChangeEvent, useCallback, useState } from 'react';

type Values = {
	email?: string;
	name?: string;
	password?: string;
	token?: string;
};

type Errors = Record<string, string>;

export const useForm = () => {
	const [values, setValues] = useState<Values>({});
	const [errors, setErrors] = useState<Errors>({});
	const [isValid, setIsValid] = useState(false);

	const checkIsEmailValid = useCallback(
		(value: string) => PATTERN_EMAIL.test(value),
		[]
	);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value, validationMessage } = e.target;

			const form = e.target.closest('form');
			setValues((prev) => ({ ...prev, [name]: value }));

			if (name === 'email') {
				const emailValid = checkIsEmailValid(value);
				if (!validationMessage && !emailValid) {
					setErrors((prev) => ({
						...prev,
						[name]: 'Введите валидный e-mail.',
					}));
				} else {
					setErrors((prev) => ({ ...prev, [name]: validationMessage }));
				}
			} else {
				setErrors((prev) => ({ ...prev, [name]: validationMessage }));
			}

			if (form) {
				form.checkValidity() ? setIsValid(true) : setIsValid(false);
			}
		},
		[checkIsEmailValid]
	);
	const resetForm = useCallback(
		(
			newValues: Values = {},
			newErrors: Errors = {},
			newIsValid: boolean = false
		) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[]
	);

	return { errors, handleChange, isValid, resetForm, setValues, values };
};
