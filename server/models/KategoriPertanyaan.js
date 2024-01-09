import { DataTypes } from "sequelize";

export const KategoriPertanyaanModel = (sequelize) => {
	return sequelize.define(
		"Kategori_Pertanyaan",
		{},
		{
			tableName: "kategori_pertanyaan",
			createdAt: true,
			updatedAt: true,
		}
	);
};
