const { DataTypes, Model } = require('sequelize');
class UserClaim extends Model {
  static associate(models) {
    UserClaim.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  UserClaim.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'claim_id' },
    UserId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    ClaimType: { type: DataTypes.STRING(100), allowNull: false, field: 'claim_type' },
    ClaimValue: { type: DataTypes.STRING(255), allowNull: false, field: 'claim_value' },
  }, { 
    sequelize, 
    tableName: 'user_claims', 
    timestamps: false 
  });
  return UserClaim;
};