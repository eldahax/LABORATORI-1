const { DataTypes, Model } = require('sequelize');
class DentalRecord extends Model {
  static associate(models) {
    DentalRecord.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    DentalRecord.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
    DentalRecord.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
    DentalRecord.hasMany(models.PatientTreatment, { foreignKey: 'dental_record_id' });
  }
}

module.exports = (sequelize) => {
  DentalRecord.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'dental_record_id' },
    PatientId: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    DoctorId: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
    AppointmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    Tooth: { type: DataTypes.STRING(50), allowNull: false, field: 'tooth' },
    Condition: { type: DataTypes.STRING(100), allowNull: false, field: 'dental_condition' },
    Notes: { type: DataTypes.STRING(255), allowNull: false, field: 'notes' },
    RecordDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'record_date' },
  }, { sequelize, tableName: 'dental_records', timestamps: false });
  return DentalRecord;
};