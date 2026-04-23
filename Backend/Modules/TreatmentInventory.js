const { DataTypes, Model } = require('sequelize');
class TreatmentInventory extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  TreatmentInventory.init({
    treatment_id: { type: DataTypes.INTEGER, primaryKey: true, field: 'treatment_id' },
    inventory_id: { type: DataTypes.INTEGER, primaryKey: true, field: 'inventory_id' },
    quantity_used: { type: DataTypes.INTEGER, field: 'quantity_used' },
  }, { sequelize, tableName: 'treatment_inventory', timestamps: false });
  return TreatmentInventory;
};