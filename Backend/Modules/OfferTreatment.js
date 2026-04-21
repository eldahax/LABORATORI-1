const { DataTypes, Model } = require('sequelize');
class OfferTreatment extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  OfferTreatment.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'offers_treatment_id' },
    OffersId: { type: DataTypes.INTEGER, allowNull: false, field: 'offers_id' },
    TreatmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
  }, { sequelize, tableName: 'offers_treatment', timestamps: false });
  return OfferTreatment;
};