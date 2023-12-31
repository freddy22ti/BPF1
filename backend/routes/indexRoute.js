import express from "express";
import * as PertanyaanController from "../controllers/PertanyaanController.js";
import * as JawabanController from "../controllers/JawabanController.js";
import * as AuthController from "../controllers/AuthController.js";
import * as UserController from "../controllers/UserController.js";

import { requireAuth } from "../middlewares/auth.js";
import {
	checkDuplicateUsernameOrEmail,
	validateLogin,
	validateRegister,
} from "../middlewares/verifySignup.js";
import { owned, ownedByOwnerAndAdmin } from "../middlewares/ownership.js";

const router = express.Router();

// login & register
router.post(
	"/register",
	[validateRegister, checkDuplicateUsernameOrEmail],
	AuthController.register
);
router.post("/login", validateLogin, AuthController.login);

// profile
router.get("/user", requireAuth, UserController.getById);
router.put(
	"/user",
	[requireAuth, UserController.validateUserInformation],
	UserController.updateById
);
router.get("/user/questions", requireAuth, PertanyaanController.getByUserId);

// Question
router.get("/question", PertanyaanController.getAll);
router.get("/question/:id", PertanyaanController.getById);
router.post(
	"/question",
	[requireAuth, PertanyaanController.validatePertanyaan],
	PertanyaanController.create
); // create
router.put(
	"/question/:id",
	[requireAuth, owned, PertanyaanController.validatePertanyaan],
	PertanyaanController.updateById
); // update
router.delete(
	"/question/:id",
	[requireAuth, ownedByOwnerAndAdmin],
	PertanyaanController.deleteById
); // delete

// answer
router.get("/answer/:question", JawabanController.getByQuestionId);
router.post(
	"/answer",
	[requireAuth, JawabanController.validateJawaban],
	JawabanController.create
);
router.put(
	"/answer/:id",
	[requireAuth, owned, JawabanController.validateJawaban],
	JawabanController.updateById
);
router.delete(
	"/answer/:id",
	[requireAuth, ownedByOwnerAndAdmin],
	JawabanController.deleteById
);

export default router;
