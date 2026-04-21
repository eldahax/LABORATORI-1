const { DataTypes, Model } = require('sequelize');
class DoctorDepartment extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  DoctorDepartment.init({
    DoctorId: { type: DataTypes.INTEGER, primaryKey: true, field: 'doctor_id' },
    DepartmentId: { type: DataTypes.INTEGER, primaryKey: true, field: 'department_id' },
  }, { sequelize, tableName: 'doctor_departments', timestamps: false });
  return DoctorDepartment;
};