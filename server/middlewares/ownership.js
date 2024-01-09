import * as Result from "../models/Result.js";

export const owned = (req, res, next) => {
	if (req.question.UserId == req.user.id) {
		return next();
	}
	return res.status(401).json(Result.error("You are not authorized")).end();
};

export const ownedByOwnerAndAdmin = (req, res, next) => {
	if ((req.question.UserId == req.user.id || req.user.role) == "admin") {
		return next();
	}
	return res.status(401).json(Result.error("You are not authorized")).end();
};

export const isAdmin = (req, res, next) => {
	if (req.user.role == "admin") {
		return next();
	}
	return res.status(401).json(Result.error("You are not authorized")).end();
};
