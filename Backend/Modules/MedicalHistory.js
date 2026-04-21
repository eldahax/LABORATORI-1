const { DataTypes, Model } = require('sequelize');

class MedicalHistory extends Model {
  static associate(models) {
    MedicalHistory.belongsTo(models.Patient, { foreignKey: 'patient_id' });
  }
}

module.exports = (sequelize) => {
  MedicalHistory.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'history_id' },
    PatientId: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    ConditionName: { type: DataTypes.STRING(100), allowNull: false, field: 'condition_name' },
    DiagnosedDate: { type: DataTypes.DATEONLY, field: 'diagnosed_date' },
    IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
    Notes: { type: DataTypes.STRING(255), field: 'notes' },
  }, { sequelize, tableName: 'medical_history', timestamps: false });
  return MedicalHistory;
};