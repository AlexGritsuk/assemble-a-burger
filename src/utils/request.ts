import { URL_API } from './vars';

const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

export async function requestApi(url: string, options: any) {
	const res = await fetch(URL_API + url, options);
	return checkResponse(res);
}
