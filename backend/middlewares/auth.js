import config from "../config.js";

const { JWT_SECRET: secret, JWT_EXPIRY: expired_time } = config;

export const requireAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json(Result.error("Authentication failed"));
	}

	try {
		const decodedToken = jwt.verify(token, secret, {
			algorithm: "HS256",
			expiresIn: expired_time,
		});

		req.user = decodedToken;
		next();
	} catch (error) {
		return res.status(401).json(Result.error(error));
	}
};
