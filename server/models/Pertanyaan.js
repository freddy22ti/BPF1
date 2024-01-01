import { DataTypes } from "sequelize";

export const PertanyaanModel = (sequelize) => {
	return sequelize.define(
		"Pertanyaan",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			judul: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			deskripsi: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "pertanyaan",
			createdAt: true,
			updatedAt: true,
		}
	);
};
