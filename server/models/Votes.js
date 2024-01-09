import { DataTypes } from "sequelize";
import { User, Jawaban } from "./db.js";

export const VotesModel = (sequelize) => {
	return sequelize.define(
		"Votes",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			UserId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: User,
					key: "id",
				},
			},
			JawabanId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: Jawaban,
					key: "id",
				},
			},
		},
		{
			uniqueKeys: {
				unique_order: {
					fields: ["UserId", "JawabanId"],
				},
			},
		},
		{
			tableName: "votes",
			createdAt: true,
			updatedAt: true,
		}
	);
};
