const { DataTypes, Model } = require('sequelize');
class Invoice extends Model {
  static associate(models) {
    Invoice.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    Invoice.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
    Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoice_id' });
    Invoice.hasMany(models.Payment, { foreignKey: 'invoice_id' });
  }
}

module.exports = (sequelize) => {
  Invoice.init({
    invoice_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'invoice_id' },
    patient_id: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
    invoice_status: { type: DataTypes.ENUM('done', 'pending'), defaultValue: 'pending', field: 'invoice_status' },
    payment_method: { type: DataTypes.ENUM('cash', 'card', 'insurance'), defaultValue: 'cash', field: 'payment_method' },
  }, { sequelize, tableName: 'invoices', timestamps: false });
  return Invoice;
};