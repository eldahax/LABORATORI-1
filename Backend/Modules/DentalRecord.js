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
    dental_record_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'dental_record_id' },
    patient_id: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    tooth: { type: DataTypes.STRING(50), allowNull: false, field: 'tooth' },
    dental_condition: { type: DataTypes.STRING(100), allowNull: false, field: 'dental_condition' },
    notes: { type: DataTypes.STRING(255), allowNull: false, field: 'notes' },
    record_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'record_date' },
  }, { sequelize, tableName: 'dental_records', timestamps: false });
  return DentalRecord;
};