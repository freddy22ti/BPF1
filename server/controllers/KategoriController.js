import * as Result from "../models/Result.js";
import { Kategori, Pertanyaan, KategoriPertanyaan } from "../models/db.js";
import { body, validationResult } from "express-validator";

export const create = async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json(Result.error("Missing values"));
	}
	const { isi } = req.body;

	await Kategori.create({
		kategori: isi,
	})
		.then(() => {
			return res.status(201).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const getAll = async (req, res) => {
	await Kategori.findAll({
		order: [["kategori", "ASC"]],
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(Result.error(err));
		});
};

export const deleteById = async (req, res) => {
	const { id } = req.params;
	await Pertanyaan.destroy({
		where: {
			id: id,
		},
		include: KategoriPertanyaan,
	});
};

export const validateKategori = [
	body("kategori")
		.exists()
		.trim()
		.withMessage("is required")

		.notEmpty()
		.withMessage("cannot be blank")

		.isLength({ max: 180 })
		.withMessage("must be at most 180 characters long"),
];
