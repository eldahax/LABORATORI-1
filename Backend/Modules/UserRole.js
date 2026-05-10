const { DataTypes, Model } = require('sequelize');

class UserRole extends Model {
  static associate(models) {
    UserRole.belongsTo(models.User, { foreignKey: "user_id" });
    UserRole.belongsTo(models.Role, { foreignKey: "role_id" });
  }
}

module.exports = (sequelize) => {
  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "user_id",
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "role_id",
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      timestamps: false,
    }
  );

  return UserRole;
};