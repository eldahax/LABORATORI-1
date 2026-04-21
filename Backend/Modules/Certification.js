const { DataTypes, Model } = require('sequelize');
class Certification extends Model {
  static associate(models) {
    Certification.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  }
}

module.exports = (sequelize) => {
  Certification.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'certification_id' },
    CertificationType: { type: DataTypes.STRING(255), allowNull: false, field: 'certification_type' },
    CertificationDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'certification_date' },
    CertificationName: { type: DataTypes.STRING(255), allowNull: false, field: 'certification_name' },
    Organization: { type: DataTypes.STRING(100), allowNull: false, field: 'organization' },
    DoctorId: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
  }, { sequelize, tableName: 'certifications', timestamps: false });
  return Certification;
};