import { AUTH_TOKEN, URL_API } from './vars';

const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

export async function requestApi(url: string, options: any) {
	const res = await fetch(URL_API + url, options);
	return checkResponse(res);
}


export const refreshToken = async () => {
	const res = await fetch(URL_API + AUTH_TOKEN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
	return checkResponse(res);
};


export const fetchWithRefresh = async (url: string, options: any) => {
	try {
		const res = await fetch(URL_API + url, options);
		return await checkResponse(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(URL_API + url, options); 
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
