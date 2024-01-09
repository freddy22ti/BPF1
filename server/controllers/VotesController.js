import { Votes } from "../models/db.js";
import * as Result from "../models/Result.js";

export const create = async (req, res) => {
	const userId = req.user.id;
	const jawabanId = req.param.id;

	await Votes.create({
		UserId: userId,
		jawabanId: jawabanId,
	})
		.then(() => {
			return res.status(201).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const deleteById = async (req, res) => {
	const voteId = req.param.id;
	await Votes.destroy({
		where: {
			id: voteId,
		},
	})
		.then(() => {
			return res.status(200).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};
