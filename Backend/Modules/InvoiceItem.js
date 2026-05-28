const { DataTypes, Model } = require('sequelize');
class InvoiceItem extends Model {
  static associate(models) {
    InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoice_id' });
    InvoiceItem.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
  }
}

module.exports = (sequelize) => {
  InvoiceItem.init({
    invoice_items_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'invoice_items_id' },
    invoice_id: { type: DataTypes.INTEGER, allowNull: false, field: 'invoice_id' },
    treatment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    quantity: { type: DataTypes.INTEGER, allowNull: false, field: 'quantity' },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'price' },
  }, { sequelize, tableName: 'invoice_items', timestamps: false });
  return InvoiceItem;
};