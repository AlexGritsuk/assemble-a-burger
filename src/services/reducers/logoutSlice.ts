import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchLogout } from '@services/asyncThunk/fetchLogout';
import { State } from '@utils/types';
import { ERROR_DEFAULT, NOTIFICATION_LOGOUT_SUCCESS } from '@utils/vars';

const initialState: State = {
	error: false,
	errorMessage: false,
	errorMessageContent: ERROR_DEFAULT,
	fetch: false,
	message: false,
	messageContent: NOTIFICATION_LOGOUT_SUCCESS,
};

export const logoutSlice = createSlice({
	extraReducers: (builder) => {
		builder
		
			.addCase(fetchLogout.pending, (state) => {
				state.fetch = true;
				state.error = false;
				state.message = false;
				state.errorMessage = false;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.fetch = false;
			})
			.addCase(fetchLogout.rejected, (state, action) => {
				if (action.payload && 'message' in action.payload) {
					const { message } = action.payload;
					state.errorMessageContent = message || ERROR_DEFAULT;
					state.fetch = false;
					state.error = true;
				} else {
					console.error('action.payload is undefined');
				}
			});
	},
	initialState,
	name: 'logout',
	reducers: {
		setMessage(state, action: PayloadAction<boolean>) {
			state.message = action.payload;
		},
	},
});

export const { setMessage } = logoutSlice.actions;

