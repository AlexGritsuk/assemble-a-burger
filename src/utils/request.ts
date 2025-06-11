import { AUTH_TOKEN, URL_API } from './vars';

const checkResponse = (res: Response): Promise<any> => {
	if (res.ok) {
		return res.json();
	} else {
		return res.json().then((err) => Promise.reject(err));
	}
};

export async function requestApi(
	url: string,
	options: RequestInit
): Promise<any> {
	const res = await fetch(URL_API + url, options);
	return checkResponse(res);
}

export const refreshToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	const res = await fetch(URL_API + AUTH_TOKEN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ token: refreshToken }),
	});
	return checkResponse(res);
};
export const fetchWithRefresh = async (
	url: string,
	options: RequestInit
): Promise<any> => {
	try {
		if (!options.headers) {
			options.headers = {};
		}
		if (localStorage.getItem('accessToken')) {
			(options.headers as Record<string, string>)['Authorization'] =
				'Bearer ' + localStorage.getItem('accessToken');
		}

		const res = await fetch(URL_API + url, options);
		return await checkResponse(res);
	} catch (err: any) {
		if (
			err.message === 'jwt expired' ||
			err.message === 'jwt expired' ||
			err?.name === 'JsonWebTokenError'
		) {
			const refreshData = await refreshToken();

			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);

			if (!options.headers) {
				options.headers = {};
			}
			(options.headers as Record<string, string>)['Authorization'] =
				'Bearer ' + refreshData.accessToken;
			const resRetry = await fetch(URL_API + url, options);
			return await checkResponse(resRetry);
		} else {
			return Promise.reject(err);
		}
	}
};
