import config from "./config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./models/db.js";

import route from "./router.js";

const app = express();
const { SERVER_PORT: port, SERVER_ADDRESS: address } = config;

app.use(cors());

// logging
app.use(morgan("dev"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);

// exception untuk url tidak sah
app.use("*", (req, res) => {
	return res.status(404).json({
		status: "failed",
		message: `Not Found ${req.originalUrl}`,
	});
});

app.use((error, req, res, next) => {
	return res.status(error.status || 500).json({
		message: error.message,
	});
});

// buat tabel
try {
	sequelize.sync();
} catch (err) {
	console.log(err);
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
