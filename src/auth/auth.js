const jwt = require("jsonwebtoken");

const accessTokenName = "access";

export const isAuthenticated = () => {
	let token = localStorage.getItem(accessTokenName);

	if (token) {
		const decoded = jwt.decode(token);
		if (decoded) {
			if (Date.now() >= decoded.exp * 1000) return false;
			else return true;
		}
		return (false);
	}
	return (false);
}

export const removeToken = () => {
	localStorage.removeItem(accessTokenName);
}

export const addToken = (token) => {
	localStorage.setItem(accessTokenName, token);
}
