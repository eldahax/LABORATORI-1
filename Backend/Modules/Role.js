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
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'role_id' },
    role_name: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'role_name' },
    description: { type: DataTypes.STRING(255), allowNull: false, field: 'description' },
    normalized_name: { type: DataTypes.STRING(255), allowNull: false, field: 'normalized_name' },
  }, { 
    sequelize, 
    tableName: 'roles', 
    timestamps: false 
  });
  return Role;
};