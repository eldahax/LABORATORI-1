const { DataTypes, Model } = require('sequelize');
class InvoiceItem extends Model {
  static associate(models) {
    InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoice_id' });
    InvoiceItem.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
  }
}

module.exports = (sequelize) => {
  InvoiceItem.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'invoice_items_id' },
    InvoiceId: { type: DataTypes.INTEGER, allowNull: false, field: 'invoice_id' },
    TreatmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'treatment_id' },
    Quantity: { type: DataTypes.INTEGER, allowNull: false, field: 'quantity' },
    Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'price' },
  }, { sequelize, tableName: 'invoice_items', timestamps: false });
  return InvoiceItem;
};