const { DataTypes, Model } = require('sequelize');
class Offer extends Model {
  static associate(models) {
    Offer.belongsToMany(models.Treatment, {
      through: models.OfferTreatment,
      foreignKey: 'offers_id',
      otherKey: 'treatment_id'
    });
  }
}

module.exports = (sequelize) => {
  Offer.init({
    offers_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'offers_id' },
    offers_name: { type: DataTypes.STRING(100), allowNull: false, field: 'offers_name' },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'price' },
    start_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'start_date' },
    end_date: { type: DataTypes.DATE, allowNull: false, field: 'end_date' },
  }, { sequelize, tableName: 'offers', timestamps: false });
  return Offer;
};