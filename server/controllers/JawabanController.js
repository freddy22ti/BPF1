import { Jawaban, User } from "../models/db.js";
import * as Result from "../models/Result.js";
import { body, validationResult } from "express-validator";
import Sequelize, { where } from "sequelize";

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
		attributes: [
			"id",
			"isi",
			"verified",
			"PertanyaanId",
			"UserId",
			[
				Sequelize.literal(`
            (select (select count(*) from votes where nilai = 1 AND Votes.JawabanId = Jawaban.Id) - (select count(*) from votes where nilai = 0 AND Votes.JawabanId = Jawaban.id))`),
				"voteCount",
			],
		],
		where: {
			PertanyaanId: question,
		},
		include: [
			{
				model: User,
				attributes: ["username"],
			},
		],
		order: [["createdAt", "DESC"]],
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			console.log(err);
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
	const { id } = req.params;
	await Jawaban.destroy({
		where: {
			id: id,
		},
	})
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const verifyById = async (req, res) => {
	const { id } = req.params;
	try {
		// Find the Jawaban record by id
		const jawaban = await Jawaban.findByPk(id);

		// Update the validate column with the opposite boolean value
		if (jawaban) {
			await jawaban
				.update({
					verified: !jawaban.verified,
				})
				.then(() => {
					return res.status(200).json(Result.success());
				})
				.catch((err) => {
					return res.status(500).json(Result.error(err));
				});
		} else {
			return res.status(404).json(Result.error("Not Found"));
		}
	} catch (error) {
		return res.status(500).json(Result.error(error));
	}
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
