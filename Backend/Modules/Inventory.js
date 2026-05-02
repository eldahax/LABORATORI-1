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
    inventory_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'inventory_id' },
    item_name: { type: DataTypes.STRING(100), allowNull: false, field: 'item_name' },
    category: { 
      type: DataTypes.ENUM('consumable', 'instrument', 'anesthetic', 'medication', 'other'), 
      allowNull: false, 
      field: 'category' 
    },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'cost' },
    quantity: { type: DataTypes.INTEGER, allowNull: false, field: 'quantity' },
    description: { type: DataTypes.STRING(100), allowNull: false, field: 'description' },
  }, { sequelize, tableName: 'inventory', timestamps: false });
  return Inventory;
};