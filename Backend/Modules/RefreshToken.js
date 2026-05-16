const { DataTypes, Model } = require('sequelize');
class RefreshToken extends Model {
  static associate(models) {
    RefreshToken.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  RefreshToken.init({
    refresh_token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'refresh_token_id' },
    user_id: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    token: { type: DataTypes.STRING(512), allowNull: false, field: 'token' },
    expires: { type: DataTypes.DATE, allowNull: false, field: 'expires' },
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created' },
    revoked: { type: DataTypes.DATE, allowNull: true, field: 'revoked' },
  }, { 
    sequelize, 
    tableName: 'refresh_tokens', 
    timestamps: false 
  });
  return RefreshToken;
};