export function ensureResult<T>(
	argument: T | null | undefined,
	message = 'This value was promised to be there.'
): T {
	if (argument === undefined || argument === null) {
		throw new TypeError(message);
	}

	return argument;
}
