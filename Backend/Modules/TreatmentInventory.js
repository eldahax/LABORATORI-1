const { DataTypes, Model } = require('sequelize');
class TreatmentInventory extends Model {
  static associate(models) {}
}

module.exports = (sequelize) => {
  TreatmentInventory.init({
    TreatmentId: { type: DataTypes.INTEGER, primaryKey: true, field: 'treatment_id' },
    InventoryId: { type: DataTypes.INTEGER, primaryKey: true, field: 'inventory_id' },
    QuantityUsed: { type: DataTypes.INTEGER, field: 'quantity_used' },
  }, { sequelize, tableName: 'treatment_inventory', timestamps: false });
  return TreatmentInventory;
};