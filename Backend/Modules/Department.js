const { DataTypes, Model } = require('sequelize');
class Department extends Model {
  static associate(models) {
    Department.belongsToMany(models.Doctor, { 
      through: models.DoctorDepartment, 
      foreignKey: 'department_id',
      otherKey: 'doctor_id'
    });
    Department.hasMany(models.Treatment, { foreignKey: 'department_id' });
    Department.hasMany(models.Room, { foreignKey: 'department_id' });
  }
}

module.exports = (sequelize) => {
  Department.init({
   department_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'department_id' },
   department_name: { type: DataTypes.STRING(100), allowNull: false, field: 'department_name' },
  }, { sequelize, tableName: 'department', timestamps: false });
  return Department;
};