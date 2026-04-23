const { DataTypes, Model } = require('sequelize');
class PatientAllergy extends Model {
  static associate(models) {
    PatientAllergy.belongsTo(models.Patient, { foreignKey: 'patient_id' });
  }
}

module.exports = (sequelize) => {
  PatientAllergy.init({
    allergy_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'allergy_id' },
    patient_id: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    allergy_name: { type: DataTypes.STRING(100), allowNull: false, field: 'allergy_name' },
  }, { sequelize, tableName: 'patient_allergies', timestamps: false });
  return PatientAllergy;
};