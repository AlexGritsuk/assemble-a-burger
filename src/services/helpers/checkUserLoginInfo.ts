import { AppDispatch } from "@services/store";
import { User } from "@utils/types";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES, EXPIRES_AT, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES } from "@utils/vars";
import { setCookie } from "./setCookie";
import { updateUser } from "@services/reducers/userSlice";

export const changeUserLoginInfo = (
	user: User,
	accessToken: string,
	refreshToken: string,
	dispatch: AppDispatch
) => {
	if (accessToken && refreshToken && user.email && user.name) {
		const expiresAt = (Date.now() + ACCESS_TOKEN_EXPIRES * 1000).toString();
		setCookie({
			name: ACCESS_TOKEN,
			props: { expires: ACCESS_TOKEN_EXPIRES },
			value: accessToken,
		});
		setCookie({
			name: REFRESH_TOKEN,
			props: { expires: REFRESH_TOKEN_EXPIRES },
			value: refreshToken,
		});
		setCookie({
			name: EXPIRES_AT,
			props: { expires: REFRESH_TOKEN_EXPIRES },
			value: expiresAt,
		});
		dispatch(
			updateUser({
				email: user.email,
				isLogin: true,
				name: user.name,
				token: { accessToken, expiresAt, refreshToken },
			})
		);
	}
};
