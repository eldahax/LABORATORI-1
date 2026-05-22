const {
  Reminder,
  Appointment,
  Doctor,
  Patient,
  User,
  sequelize,
} = require("../models");


const validateReminderInput = ({ appointment_id, reminder_date, message }) => {
  if (!appointment_id) throw new Error("Appointment ID is required");

  if (!reminder_date) throw new Error("Reminder date is required");

  if (!message || !message.trim()) {
    throw new Error("Message is required");
  }
};

const getAppointmentOrThrow = async (appointment_id, t) => {
  const appointment = await Appointment.findByPk(appointment_id, {
    transaction: t,
  });

  if (!appointment) throw new Error("Appointment not found");

  return appointment;
};


const validateReminderDate = (reminderDate, appointmentDate) => {
  const reminder = new Date(reminderDate);
  const appointment = new Date(appointmentDate);

  if (isNaN(reminder.getTime())) {
    throw new Error("Invalid reminder date");
  }

  if (reminder >= appointment) {
    throw new Error("Reminder date must be before appointment date");
  }

  return reminder;
};

const confirmAppointment = async (appointment_id) => {
  const t = await sequelize.transaction();

  try {
    const appointment = await getAppointmentOrThrow(appointment_id, t);

    if (appointment.status === "confirmed") {
      throw new Error("Appointment already confirmed");
    }

    await appointment.update(
      { status: "confirmed" },
      { transaction: t }
    );

    const existingReminder = await Reminder.findOne({
      where: { appointment_id: appointment.appointment_id },
      transaction: t,
    });

    if (!existingReminder) {
      const appointmentDate = new Date(
        appointment.appointment_date_time
      );

      const reminderDate = new Date(
        appointmentDate.getTime() - 60 * 60 * 1000
      );

      await Reminder.create(
        {
          appointment_id: appointment.appointment_id,
          reminder_date: reminderDate,
          message: `Reminder: You have an appointment scheduled on ${appointmentDate.toLocaleString()}`,
          sent: false,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return {
      message: "Appointment confirmed successfully",
      appointment,
    };
  } catch (err) {
    await t.rollback();
    throw new Error(err.message);
  }
};

const createReminder = async (data) => {
  const t = await sequelize.transaction();

  try {
    validateReminderInput(data);

    const appointment = await getAppointmentOrThrow(
      data.appointment_id,
      t
    );

    const reminderDate = validateReminderDate(
      data.reminder_date,
      appointment.appointment_date_time
    );

    const reminder = await Reminder.create(
      {
        appointment_id: data.appointment_id,
        reminder_date: reminderDate,
        message: data.message.trim(),
        sent: false,
      },
      { transaction: t }
    );

    await t.commit();
    return reminder;
  } catch (err) {
    await t.rollback();
    throw new Error(err.message);
  }
};


const getAllReminders = async (user) => {
  let includeFilter = [
    {
      model: Appointment,
      include: [
        { model: Doctor, include: [User] },
        { model: Patient, include: [User] },
      ],
    },
  ];

  const roles = user.roles || [];

  if (roles.includes("patient")) {
    includeFilter[0].where = {
      patient_id: user.patient_id,
    };
  }

  else if (roles.includes("doctor")) {
    includeFilter[0].where = {
      doctor_id: user.doctor_id,
    };
  }

  return await Reminder.findAll({
    include: includeFilter,
    order: [["reminder_date", "DESC"]],
  });
};



const getReminderById = async (id) => {
  try {
    const reminder = await Reminder.findByPk(id, {
      include: [
        {
          model: Appointment,
          include: [
            { model: Doctor, include: [User] },
            { model: Patient, include: [User] },
          ],
        },
      ],
    });

    if (!reminder) throw new Error("Reminder not found");

    return reminder;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateReminder = async (id, data) => {
  const t = await sequelize.transaction();

  try {
    const reminder = await Reminder.findByPk(id, {
      transaction: t,
    });

    if (!reminder) throw new Error("Reminder not found");

    const appointmentId =
      data.appointment_id || reminder.appointment_id;

    const appointment = await getAppointmentOrThrow(
      appointmentId,
      t
    );

    let reminderDate = reminder.reminder_date;

    if (data.reminder_date) {
      reminderDate = validateReminderDate(
        data.reminder_date,
        appointment.appointment_date_time
      );
    }

    await reminder.update(
      {
        appointment_id: appointmentId,
        reminder_date: reminderDate,
        message: data.message?.trim() || reminder.message,
        sent:
          typeof data.sent === "boolean"
            ? data.sent
            : reminder.sent,
      },
      { transaction: t }
    );

    await t.commit();
    return reminder;
  } catch (err) {
    await t.rollback();
    throw new Error(err.message);
  }
};

const deleteReminder = async (id) => {
  const t = await sequelize.transaction();

  try {
    const reminder = await Reminder.findByPk(id, {
      transaction: t,
    });

    if (!reminder) throw new Error("Reminder not found");

    await reminder.destroy({ transaction: t });

    await t.commit();

    return { message: "Reminder deleted successfully" };
  } catch (err) {
    await t.rollback();
    throw new Error(err.message);
  }
};

const markAsSent = async (id) => {
  const t = await sequelize.transaction();

  try {
    const reminder = await Reminder.findByPk(id, {
      transaction: t,
    });

    if (!reminder) throw new Error("Reminder not found");

    if (reminder.sent) {
      throw new Error("Reminder already marked as sent");
    }

    await reminder.update(
      { sent: true },
      { transaction: t }
    );

    await t.commit();
    return reminder;
  } catch (err) {
    await t.rollback();
    throw new Error(err.message);
  }
};

module.exports = {
  confirmAppointment,
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  markAsSent,
};