import { Jawaban, Pertanyaan, User } from "../models/db.js";
import * as Result from "../models/Result.js";
import { body, validationResult } from "express-validator";

export const create = async (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error("Missing values"));
	}

	const { judul, deskripsi } = req.body;
	const user_id = req.user.id;

	await Pertanyaan.create({
		UserId: user_id,
		judul: judul,
		deskripsi: deskripsi,
	})
		.then(() => {
			return res.status(201).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const getAll = async (req, res, next) => {
	await Pertanyaan.findAll({
		order: [["createdAt", "DESC"]],
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const getById = async (req, res) => {
	const { id } = req.params;
	await Pertanyaan.findOne({
		where: {
			id: id,
		},
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const deleteById = async (req, res) => {
	const { id } = req.params;
	await Pertanyaan.destroy({
		where: {
			id: id,
		},
		include: Jawaban,
	})
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const updateById = async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error("Missing values"));
	}

	const { id } = req.params;
	const { judul, deskripsi } = req.body;

	await Pertanyaan.update(
		{
			judul: judul,
			deskripsi: deskripsi,
		},
		{
			where: {
				id: id,
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

export const getByUserId = async (req, res) => {
	const UserId = req.user.id;
	await Pertanyaan.findAll({
		where: {
			UserId,
			UserId,
		},
		order: [["createdAt", "DESC"]],
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const validatePertanyaan = [
	body("judul")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		.isLength({ max: 180 })
		.withMessage("must be at most 180 characters long"),

	body("deskripsi")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")
		// .isLength({ min: 10 })
		.isLength({ min: 1 })
		.withMessage("must be at least 10 characters long")

		.isLength({ max: 5000 })
		.withMessage("must be at most 5000 characters long"),
];
