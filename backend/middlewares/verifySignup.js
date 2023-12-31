import * as Result from "../models/Result.js";
import { User } from "../models/db.js";
import { body } from "express-validator";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
	const username = await User.findOne({
		where: {
			username: req.body.username,
		},
	});

	const email = await User.findOne({
		where: {
			email: req.body.email,
		},
	});

	if (username !== null) {
		return res.status(401).json(Result.error("Username already exist"));
	} else if (email !== null) {
		return res.status(401).json(Result.error("Email already exist"));
	} else {
		next();
	}
};

export const validateLogin = [
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

export const validateRegister = [
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

	body("confirmPassword")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}
			return true;
		})
		.withMessage("Passwords do not match"),
];
