import Sequelize from "sequelize";
import config from "../config.js";
import { PertanyaanModel } from "./Pertanyaan.js";
import { JawabanModel } from "./Jawaban.js";
import { UserModel } from "./User.js";
import { KategoriModel } from "./Kategori.js";
import { VotesModel } from "./Votes.js";
import { KategoriPertanyaanModel } from "./KategoriPertanyaan.js";

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
const Kategori = KategoriModel(sequelize);
const Votes = VotesModel(sequelize);
const KategoriPertanyaan = KategoriPertanyaanModel(sequelize);

// FK tabel pertanyaan
Pertanyaan.belongsTo(User);
Pertanyaan.hasMany(Jawaban);
Pertanyaan.hasMany(KategoriPertanyaan);

// FK tabel jawaban
Jawaban.belongsTo(Pertanyaan);
Jawaban.belongsTo(User);

// FK tabel user
User.hasMany(Pertanyaan);
User.hasMany(Jawaban);
User.hasMany(Votes);

// FK tabel kategori
Kategori.hasMany(KategoriPertanyaan);

// FK tabel votes
Votes.belongsTo(Jawaban, { foreignKey: "JawabanId" });
Votes.belongsTo(User, { foreignKey: "UserId" });

export {
	sequelize,
	Pertanyaan,
	Jawaban,
	User,
	Votes,
	Kategori,
	KategoriPertanyaan,
};
