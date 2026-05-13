const { DataTypes, Model } = require('sequelize');
class Certification extends Model {
  static associate(models) {
    Certification.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  }
}

module.exports = (sequelize) => {
  Certification.init({
    certification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'certification_id' },
    certification_type: { type: DataTypes.STRING(255), allowNull: true, field: 'certification_type' },
    certification_date: { type: DataTypes.DATEONLY, allowNull: false, field: 'certification_date' },
    certification_name: { type: DataTypes.STRING(255), allowNull: false, field: 'certification_name' },
    organization: { type: DataTypes.STRING(100), allowNull: false, field: 'organization' },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
  }, { sequelize, tableName: 'certifications', timestamps: false });
  return Certification;
};