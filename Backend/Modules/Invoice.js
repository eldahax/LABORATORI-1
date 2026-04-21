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
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'invoice_id' },
    PatientId: { type: DataTypes.INTEGER, allowNull: false, field: 'patient_id' },
    AppointmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
    Status: { type: DataTypes.ENUM('done', 'pending'), defaultValue: 'pending', field: 'invoice_status' },
    PaymentMethod: { type: DataTypes.ENUM('cash', 'card', 'insurance'), defaultValue: 'cash', field: 'payment_method' },
  }, { sequelize, tableName: 'invoices', timestamps: false });
  return Invoice;
};