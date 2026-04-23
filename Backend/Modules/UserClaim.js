const { DataTypes, Model } = require("sequelize");
class UserClaim extends Model {
  static associate(models) {
    UserClaim.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = (sequelize) => {
  UserClaim.init(
    {
      claim_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "claim_id",
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
      claim_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "claim_type",
      },
      claim_value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "claim_value",
      },
    },
    {
      sequelize,
      tableName: "user_claims",
      timestamps: false,
    },
  );
  return UserClaim;
};
