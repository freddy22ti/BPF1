import Sequelize from "sequelize";
import config from "../config.js";
import {PertanyaanModel} from "./Pertanyaan.js";
import {JawabanModel} from "./Jawaban.js";
import {UserModel} from "./User.js";

const {
	DB_DATABASE: database,
	DB_USERNAME: username,
	DB_PASSWD: password,
	DB_HOST: host,
} = config;

// Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
	host: host,
	dialect: "mysql",
});

const Pertanyaan = PertanyaanModel(sequelize);
const Jawaban = JawabanModel(sequelize);
const User = UserModel(sequelize);

// FK tabel pertanyaan
Pertanyaan.belongsTo(User);
Pertanyaan.hasMany(Jawaban);

// FK tabel jawaban
Jawaban.belongsTo(Pertanyaan);
Jawaban.belongsTo(User);

// FK tabel user
User.hasMany(Pertanyaan);
User.hasMany(Jawaban);

export {
	sequelize,
	Pertanyaan,
	Jawaban,
	User,
};
