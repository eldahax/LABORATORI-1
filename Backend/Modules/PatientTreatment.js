const { DataTypes, Model } = require('sequelize');

class PatientTreatment extends Model {
  static associate(models) {
    PatientTreatment.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
    PatientTreatment.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
    PatientTreatment.belongsTo(models.DentalRecord, { foreignKey: 'dental_record_id' });
  }
}

module.exports = (sequelize) => {
  PatientTreatment.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'patient_treatments_id' },
    TreatmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    AppointmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    DentalRecordId: { type: DataTypes.INTEGER, allowNull: false, field: 'dental_record_id' },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
    PtDescription: { type: DataTypes.STRING(255), allowNull: false, field: 'pt_description' },
    TreatmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'treatment_date' },
  }, { sequelize, tableName: 'patient_treatments', timestamps: false });
  return PatientTreatment;
};