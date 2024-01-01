import { Jawaban, User } from "../models/db.js";
import * as Result from "../models/Result.js";
import { body, validationResult } from "express-validator";

export const create = async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		// return res.status(422).json(Result.error("Missing values"));
		return res.status(422).json(Result.error(result));
	}

	const { id_pertanyaan, isi } = req.body;
	const UserId = req.user.id;

	await Jawaban.create({
		UserId: UserId,
		PertanyaanId: id_pertanyaan,
		isi: isi,
	})
		.then(() => {
			return res.status(201).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const getByQuestionId = async (req, res) => {
	const { question } = req.params;
	await Jawaban.findAll({
		include: User,
		where: {
			PertanyaanId: question,
		},
		order:[
			['createdAt', 'DESC'],
		]
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
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

	const id_jawaban = req.params.id;
	const { isi } = req.body;

	await Jawaban.update(
		{
			isi: isi,
		},
		{
			where: {
				id: id_jawaban,
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

export const deleteById = async (req, res) => {
	const { id_jawaban } = req.params;
	await Jawaban.destroy({
		where: {
			id: id_jawaban,
		},
	})
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const validateJawaban = [
	body("isi")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		.isLength({ max: 255 })
		.withMessage("must be at most 255 characters long"),
];
