const { DataTypes, Model } = require('sequelize');
class Room extends Model {
  static associate(models) {
    Room.belongsTo(models.Department, { foreignKey: 'department_id' });
    Room.hasMany(models.Appointment, { foreignKey: 'room_id' });
  }
}

module.exports = (sequelize) => {
  Room.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'room_id' },
    RoomName: { type: DataTypes.STRING(100), allowNull: false, field: 'room_name' },
    DepartmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'department_id' },
    ChairNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'chair_number' },
  }, { sequelize, tableName: 'rooms', timestamps: false });
  return Room;
};