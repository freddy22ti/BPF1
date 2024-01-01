import config from "../config.js";
import jwt from 'jsonwebtoken'
import * as Result from "../models/Result.js";

const { JWT_SECRET: secret, JWT_EXPIRY: expired_time } = config;

export const requireAuth = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(401).json(Result.error("Authentication failed"));
	}

	try {
		const decodedToken = jwt.verify(token, secret, {
			algorithm: "HS256",
		});

		req.user = decodedToken;
		console.log(decodedToken);
		next();
	} catch (error) {
		console.log(decodedToken);
		return res.status(401).json(Result.error(error));
	}
};
