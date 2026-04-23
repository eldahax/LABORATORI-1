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
    patient_treatments_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'patient_treatments_id' },
    treatment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    dental_record_id: { type: DataTypes.INTEGER, allowNull: false, field: 'dental_record_id' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
    pt_description: { type: DataTypes.STRING(255), allowNull: false, field: 'pt_description' },
    treatment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'treatment_date' },
  }, { sequelize, tableName: 'patient_treatments', timestamps: false });
  return PatientTreatment;
};