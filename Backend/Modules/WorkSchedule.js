const { DataTypes, Model } = require('sequelize');

class WorkSchedule extends Model {
  static associate(models) {
    WorkSchedule.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  }
}

module.exports = (sequelize) => {
  WorkSchedule.init({
    work_schedule_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'work_schedule_id' },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
    schedule_day: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      field: 'schedule_day'
    },
    start_time: { type: DataTypes.TIME, allowNull: false, field: 'start_time' },
    end_time: { type: DataTypes.TIME, allowNull: false, field: 'end_time' },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'inactive', field: 'status' },
  }, { sequelize, tableName: 'work_schedule', timestamps: false });
  return WorkSchedule;
};