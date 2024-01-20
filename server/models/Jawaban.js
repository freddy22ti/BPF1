import { DataTypes } from "sequelize";

export const JawabanModel = (sequelize) => {
	return sequelize.define(
		"Jawaban",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			isi: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			tableName: "jawaban",
			createdAt: true,
			updatedAt: true,
		}
	);
};
