const { DataTypes, Model } = require('sequelize');
class DoctorDepartment extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  DoctorDepartment.init({
    doctor_id: { type: DataTypes.INTEGER, primaryKey: true, field: 'doctor_id' },
    department_id: { type: DataTypes.INTEGER, primaryKey: true, field: 'department_id' },
  }, { sequelize, tableName: 'doctor_departments', timestamps: false });
  return DoctorDepartment;
};