const { DataTypes, Model } = require("sequelize");
class UserToken extends Model {
  static associate(models) {
    UserToken.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = (sequelize) => {
  UserToken.init(
    {
      token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "token_id",
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
      LoginProvider: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "login_provider",
      },
      token_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "token_name",
      },
      token_value: {
        type: DataTypes.STRING(512),
        allowNull: false,
        field: "token_value",
      },
    },
    {
      sequelize,
      tableName: "user_tokens",
      timestamps: false,
    },
  );
  return UserToken;
};
