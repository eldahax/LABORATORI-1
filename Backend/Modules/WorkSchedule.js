const { DataTypes, Model } = require('sequelize');

class WorkSchedule extends Model {
  static associate(models) {
    WorkSchedule.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  }
}

module.exports = (sequelize) => {
  WorkSchedule.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'work_schedule_id' },
    DoctorId: { type: DataTypes.INTEGER, allowNull: false, field: 'doctor_id' },
    ScheduleDay: { 
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), 
      field: 'schedule_day' 
    },
    StartTime: { type: DataTypes.TIME, allowNull: false, field: 'start_time' },
    EndTime: { type: DataTypes.TIME, allowNull: false, field: 'end_time' },
    Status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'inactive', field: 'status' },
  }, { sequelize, tableName: 'work_schedule', timestamps: false });
  return WorkSchedule;
};