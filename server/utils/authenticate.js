import bcrypt from "bcrypt";
import config from "../config.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET: secret, JWT_EXPIRY: expired_time } = config;
const saltRounds = 10;

export const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				reject(err);
			}
			resolve(hash);
		});
	});
};

export const verifyPassword = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

export const createToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
			role: user.role,
		},
		secret,
		{ algorithm: "HS256" }
	);
};
