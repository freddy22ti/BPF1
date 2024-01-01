import { DataTypes } from "sequelize";

export const UserModel = (sequelize) => {
	return sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.ENUM,
				values: ["admin", "user"],
				allowNull: false,
			},
		},
		{
			tableName: "user",
			createdAt: true,
			updatedAt: true,
		}
	);
};
