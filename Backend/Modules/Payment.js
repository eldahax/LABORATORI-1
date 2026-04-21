const { DataTypes, Model } = require('sequelize');
class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.Invoice, { foreignKey: 'invoice_id' });
  }
}

module.exports = (sequelize) => {
  Payment.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'payment_id' },
    InvoiceId: { type: DataTypes.INTEGER, allowNull: false, field: 'invoice_id' },
    Amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'amount' },
    PaymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'payment_date' },
    PaymentMethod: { type: DataTypes.ENUM('cash', 'card', 'insurance'), allowNull: false, field: 'payment_method' },
  }, { sequelize, tableName: 'payments', timestamps: false });
  return Payment;
};