const { DataTypes, Model } = require("sequelize");
class Appointment extends Model {
  static associate(models) {
    Appointment.belongsTo(models.Patient, { foreignKey: "patient_id" });
    Appointment.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
    Appointment.belongsTo(models.Room, { foreignKey: "room_id" });
    Appointment.hasMany(models.DentalRecord, { foreignKey: "appointment_id" });
    Appointment.hasMany(models.PatientTreatment, {
      foreignKey: "appointment_id",
    });
    Appointment.hasMany(models.Invoice, { foreignKey: "appointment_id" });
    Appointment.hasMany(models.Reminder, { foreignKey: "appointment_id" });
  }
}

module.exports = (sequelize) => {
  Appointment.init(
    {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "appointment_id",
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "patient_id",
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doctor_id",
      },
      created_at: { type: DataTypes.INTEGER, allowNull: false, field: "room_id" },
      CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      appointment_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "appointment_date_time",
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "duration",
      },
      appointment_status: {
        type: DataTypes.ENUM("confirmed", "pending", "cancelled", "complete"),
        defaultValue: "pending",
        field: "appointment_status",
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "description",
      },
    },
    { sequelize,tableName: 'appointments',timestamps: true, createdAt: 'created_at', updatedAt: false})
  return Appointment;
};
