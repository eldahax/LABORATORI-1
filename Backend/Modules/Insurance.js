const { DataTypes, Model } = require('sequelize');
class Insurance extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  Insurance.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'insurance_id' },
    InsuranceName: { type: DataTypes.STRING(100), allowNull: false, field: 'insurance_name' },
  }, { sequelize, tableName: 'insurance', timestamps: false });
  return Insurance;
};