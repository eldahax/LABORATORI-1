const { DataTypes, Model } = require('sequelize');
class Reminder extends Model {
  static associate(models) {
    Reminder.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
  }
}

module.exports = (sequelize) => {
  Reminder.init({
    reminder_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'reminder_id' },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    reminder_date: { type: DataTypes.DATE, allowNull: false, field: 'reminder_date' },
    sent: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'sent' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
  }, { sequelize, tableName: 'reminders', timestamps: false });
  return Reminder;
};