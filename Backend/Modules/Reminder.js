const { DataTypes, Model } = require('sequelize');
class Reminder extends Model {
  static associate(models) {
    Reminder.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
  }
}

module.exports = (sequelize) => {
  Reminder.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'reminder_id' },
    AppointmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    ReminderDate: { type: DataTypes.DATE, allowNull: false, field: 'reminder_date' },
    Sent: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'sent' },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
  }, { sequelize, tableName: 'reminders', timestamps: false });
  return Reminder;
};