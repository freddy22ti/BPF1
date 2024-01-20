import express from "express";
import * as PertanyaanController from "./controllers/PertanyaanController.js";
import * as JawabanController from "./controllers/JawabanController.js";
import * as AuthController from "./controllers/AuthController.js";
import * as UserController from "./controllers/UserController.js";
import * as KategoriController from "./controllers/KategoriController.js";
import * as VotesController from "./controllers/VotesController.js";

import { requireAuth } from "./middlewares/auth.js";
import {
	checkDuplicateUsernameOrEmail,
	validateLogin,
	validateRegister,
} from "./middlewares/verifySignup.js";
import {
	owned,
	ownedByOwnerAndAdmin,
	isAdmin,
} from "./middlewares/ownership.js";

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
router.get("/user/question", requireAuth, PertanyaanController.getByUserId);

// Question
router.get("/question", PertanyaanController.getAll);
router.get("/question/:id", PertanyaanController.getById);
router.get("/search/:judul", PertanyaanController.getByTitle);
router.post(
	"/question",
	[requireAuth, PertanyaanController.validatePertanyaan],
	PertanyaanController.create
); // create
router.put(
	"/question/:id",
	[requireAuth, PertanyaanController.validatePertanyaan],
	PertanyaanController.updateById
); // update
router.delete("/question/:id", [requireAuth], PertanyaanController.deleteById); // delete

// answer
router.get("/answer/:question", JawabanController.getByQuestionId);
router.post(
	"/answer",
	[requireAuth, JawabanController.validateJawaban],
	JawabanController.create
);
router.put(
	"/answer/:id",
	[requireAuth, JawabanController.validateJawaban],
	JawabanController.updateById
);
router.delete("/answer/:id", [requireAuth], JawabanController.deleteById);

// verify answer
router.get("/verifyAnswer/:id", requireAuth, JawabanController.verifyById)

// kategori
router.get("/kategori", KategoriController.getAll);
router.post(
	"/kategori",
	[requireAuth, KategoriController.validateKategori],
	KategoriController.create
);
router.delete(
	"/kategori/:id",
	[requireAuth, isAdmin],
	KategoriController.deleteById
);


// votes
router.get("/vote/:id", requireAuth, VotesController.getVotesByUserId)
router.post("/vote/:id", requireAuth, VotesController.create);
router.delete("/vote/:id", requireAuth, VotesController.deleteById);


export default router;
