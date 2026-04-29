const { DataTypes, Model } = require('sequelize');
class OfferTreatment extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  OfferTreatment.init({
    offers_treatment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'offers_treatment_id' },
    offers_id: { type: DataTypes.INTEGER, allowNull: false, field: 'offers_id' },
    treatment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
  }, { sequelize, tableName: 'offers_treatment', timestamps: false });
  return OfferTreatment;
};