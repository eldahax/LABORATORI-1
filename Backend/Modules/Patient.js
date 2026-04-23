const { DataTypes, Model } = require('sequelize');

class Patient extends Model {
  static associate(models) {
    Patient.belongsTo(models.User, { foreignKey: 'user_id' });
    Patient.hasMany(models.PatientAllergy, { foreignKey: 'patient_id' });
    Patient.hasMany(models.Appointment, { foreignKey: 'patient_id' });
    Patient.hasMany(models.DentalRecord, { foreignKey: 'patient_id' });
    Patient.hasMany(models.Invoice, { foreignKey: 'patient_id' });
    Patient.hasMany(models.Review, { foreignKey: 'patient_id' });
    Patient.hasMany(models.MedicalHistory, { foreignKey: 'patient_id' });
  }
}

module.exports = (sequelize) => {
  Patient.init({
    patient_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'patient_id' },
    date_of_birth: { type: DataTypes.DATEONLY, allowNull: false, field: 'date_of_birth' },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'user_id' },
  }, { sequelize, tableName: 'patients', timestamps: false });
  return Patient;
};