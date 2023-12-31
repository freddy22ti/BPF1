import * as Result from "../models/Result.js";
import { User } from "../models/db.js";
import { body, validationResult } from "express-validator";
import { verifyPassword } from "../utils/authenticate.js";

export const getById = async (req, res, next) => {
	const user = await User.findOne({
		where: {
			id: user.id,
		},
	});
	delete user.password;

	return res.status(200).json(Result.success(user));
};

export const updateById = async (req, res, next) => {
	const username = req.body.username.toLowerCase();
	const email = req.body.email.toLowerCase();
	const { password } = req.body;

	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error("Missing values"));
	}

	const user = await User.findOne({
		where: {
			id: req.user.id,
		},
	});

	if (!(await verifyPassword(password, user.password))) {
		return res.status(403).json(Result.error("Wrong password"));
	}

	await User.update(
		{
			username: username,
			email: email,
		},
		{
			where: {
				id: req.user.id,
			},
		}
	)
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const validateUserInformation = [
	body("username")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		.isLength({ max: 16 })
		.withMessage("must be at most 16 characters long")

		.matches(/^[a-zA-Z0-9_-]+$/)
		.withMessage("contains invalid characters"),

	body("email")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		.isEmail()
		.withMessage("is not valid email"),

	body("password")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		// .isLength({ min: 8 })
		// .withMessage("must be at least 8 characters long")

		.isLength({ max: 50 })
		.withMessage("must be at most 50 characters long"),
];
