import { Votes } from "../models/db.js";
import * as Result from "../models/Result.js";

export const getVotesByUserId = async (req, res) => {
	const userId = req.user.id;
	const jawabanId = req.params.id;

	await Votes.findAll({
		where: {
			UserId: userId,
			JawabanId: jawabanId,
		},
	})
		.then((result) => {
			return res.status(200).json(Result.success(result));
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json(Result.error(err));
		});
};

export const create = async (req, res) => {
	const userId = req.user.id;
	const jawabanId = req.params.id;
	const { nilai } = req.body;

	await Votes.create({
		UserId: userId,
		JawabanId: jawabanId,
		nilai: nilai,
	})
		.then(() => {
			return res.status(201).json(Result.success());
		})
		.catch((err) => {
			return res.status(500).json(Result.error(err));
		});
};

export const deleteById = async (req, res) => {
	const voteId = req.params.id;
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
