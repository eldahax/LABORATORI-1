const { DataTypes, Model } = require('sequelize');
class Doctor extends Model {
  static associate(models) {
    Doctor.belongsTo(models.User, { foreignKey: 'user_id' });
    Doctor.belongsToMany(models.Department, { 
      through: models.DoctorDepartment, 
      foreignKey: 'doctor_id',
      otherKey: 'department_id'
    });
    Doctor.hasMany(models.Certification, { foreignKey: 'doctor_id' });
    Doctor.hasMany(models.Appointment, { foreignKey: 'doctor_id' });
    Doctor.hasMany(models.DentalRecord, { foreignKey: 'doctor_id' });
    Doctor.hasMany(models.WorkSchedule, { foreignKey: 'doctor_id' });
  }
}

module.exports = (sequelize) => {
  Doctor.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'doctor_id' },
    UserId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'user_id' },
    Specialization: { type: DataTypes.STRING(100), allowNull: false, field: 'specialization' },
    LicenseNumber: { type: DataTypes.STRING(255), allowNull: false, unique: true, field: 'license_number' },
    YearsExperience: { type: DataTypes.INTEGER, allowNull: false, field: 'years_experience' },
    PhotoUrl: { type: DataTypes.STRING(255), allowNull: true, field: 'photo_url' },
    Description: { type: DataTypes.STRING(100), allowNull: false, field: 'description' },
    Status: { type: DataTypes.ENUM('active', 'on_leave', 'retired'), defaultValue: 'active', field: 'status' },
  }, { sequelize, tableName: 'doctor', timestamps: false });
  return Doctor;
};