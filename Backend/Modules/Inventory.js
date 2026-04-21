const { DataTypes, Model } = require('sequelize');
class Inventory extends Model {
  static associate(models) {
    Inventory.belongsToMany(models.Treatment, { 
      through: models.TreatmentInventory, 
      foreignKey: 'inventory_id', 
      otherKey: 'treatment_id' 
    });
  }
}

module.exports = (sequelize) => {
  Inventory.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'inventory_id' },
    ItemName: { type: DataTypes.STRING(100), allowNull: false, field: 'item_name' },
    Category: { 
      type: DataTypes.ENUM('consumable', 'instrument', 'anesthetic', 'medication', 'other'), 
      allowNull: false, 
      field: 'category' 
    },
    Cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'cost' },
    Quantity: { type: DataTypes.INTEGER, allowNull: false, field: 'quantity' },
    Description: { type: DataTypes.STRING(100), allowNull: false, field: 'description' },
  }, { sequelize, tableName: 'inventory', timestamps: false });
  return Inventory;
};