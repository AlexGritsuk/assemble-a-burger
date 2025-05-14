interface TauthState {
	user: {
		email: any;
		name: any;
	};
	isAuthChecked: boolean;
	status: {
		get_info: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		register: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		login: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		reset: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		reset_confirm: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		logout: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
		update: {
			loading: boolean;
			error: boolean;
			success: boolean;
		};
	};
}

export const initialState: TauthState = {
	user: {
		email: '',
		name: '',
	},
	isAuthChecked: false,
	status: {
		get_info: {
			loading: false,
			error: false,
			success: false,
		},
		register: {
			loading: false,
			error: false,
			success: false,
		},
		login: {
			loading: false,
			error: false,
			success: false,
		},
		reset: {
			loading: false,
			error: false,
			success: false,
		},
		reset_confirm: {
			loading: false,
			error: false,
			success: false,
		},
		logout: {
			loading: false,
			error: false,
			success: false,
		},
		update: {
			loading: false,
			error: false,
			success: false,
		},
	},
};
