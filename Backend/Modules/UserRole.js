const { DataTypes, Model } = require('sequelize');
class UserRole extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  UserRole.init({
    UserId: { type: DataTypes.INTEGER, primaryKey: true, field: 'user_id' },
    RoleId: { type: DataTypes.INTEGER, primaryKey: true, field: 'role_id' },
  }, { 
    sequelize, 
    tableName: 'user_roles', 
    timestamps: false 
  });
  return UserRole;
};