const { DataTypes, Model } = require('sequelize');
class RefreshToken extends Model {
  static associate(models) {
    RefreshToken.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  RefreshToken.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'refresh_token_id' },
    UserId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    Token: { type: DataTypes.STRING(512), allowNull: false, field: 'token' },
    Expires: { type: DataTypes.DATE, allowNull: false, field: 'expires' },
    Created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created' },
    Revoked: { type: DataTypes.DATE, allowNull: true, field: 'revoked' },
  }, { 
    sequelize, 
    tableName: 'refresh_tokens', 
    timestamps: false 
  });
  return RefreshToken;
};