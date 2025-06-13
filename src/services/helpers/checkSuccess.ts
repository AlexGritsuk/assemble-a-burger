type CustomError = {
	data: Error;
	ok: boolean;
	status: number;
	statusText: string;
	success: boolean;
	url: string;
};

export const checkSuccess = (
	res: ({ success: boolean } & Promise<unknown>) | CustomError
) => (res.success ? res : Promise.reject(res).then((r: Response) => r.json()));
