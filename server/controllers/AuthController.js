import * as Result from "../models/Result.js";
import { User } from "../models/db.js";
import {
	verifyPassword,
	hashPassword,
	createToken,
} from "../utils/authenticate.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
	const username = req.body.username.toLowerCase();
	const email = req.body.email.toLowerCase();
	const { password } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error("Missing values"));
	}

	await User.create({
		username: username,
		email: email,
		password: await hashPassword(password),
		role: "user",
	})
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const login = async (req, res) => {
	const email = req.body.email.toLowerCase();
	const { password } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error(result));
	}

	const user = await User.findOne({
		where: {
			email: email,
		},
	});

	if (!user) {
		return res.status(401).json(Result.error("Login failed"));
	}

	if (!(await verifyPassword(password, user.password))) {
		return res.status(401).json(Result.error("Login failed"));
	}

	const token = createToken(user);

	return res.status(200).json(
		Result.success({
			id: user.id,
			role: user.role,
			accessToken: token,
		})
	);
};
