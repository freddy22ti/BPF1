import { DataTypes } from "sequelize";

export const KategoriModel = (sequelize) => {
	return sequelize.define(
		"Kategori",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			kategori: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "kategori",
			createdAt: true,
			updatedAt: true,
		}
	);
};
