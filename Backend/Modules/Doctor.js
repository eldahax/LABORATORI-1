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
    doctor_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'doctor_id' },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'user_id' },
    specialization: { type: DataTypes.STRING(100), allowNull: false, field: 'specialization' },
    license_number: { type: DataTypes.STRING(255), allowNull: false, unique: true, field: 'license_number' },
    years_experience: { type: DataTypes.INTEGER, allowNull: false, field: 'years_experience' },
    photo_url: { type: DataTypes.STRING(255), allowNull: true, field: 'photo_url' },
    description: { type: DataTypes.STRING(100), allowNull: false, field: 'description' },
    status: { type: DataTypes.ENUM('active', 'on_leave', 'retired'), defaultValue: 'active', field: 'status' },
  }, { sequelize, tableName: 'doctor', timestamps: false });
  return Doctor;
};