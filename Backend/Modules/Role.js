const { DataTypes, Model } = require('sequelize');
class Role extends Model {
  static associate(models) {
    Role.belongsToMany(models.User, { 
      through: models.UserRole, 
      foreignKey: 'role_id',
      otherKey: 'user_id' 
    });
  }
}

module.exports = (sequelize) => {
  Role.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'role_id' },
    RoleName: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'role_name' },
    Description: { type: DataTypes.STRING(255), allowNull: false, field: 'description' },
    NormalizedName: { type: DataTypes.STRING(255), allowNull: false, field: 'normalized_name' },
  }, { 
    sequelize, 
    tableName: 'roles', 
    timestamps: false 
  });
  return Role;
};