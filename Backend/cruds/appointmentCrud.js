const {
  Appointment,
  PatientTreatment,
  User,
  Patient,
  Doctor,
  DoctorDepartment,
  Treatment,
  Room,
  DentalRecord,
  WorkSchedule,
  Reminder,
  sequelize,
} = require("../models/index");

const create = async (
  full_name,
  doctorId,
  email,
  appointment_date_time,
  description,
) => {
  const t = await sequelize.transaction();

  try {
    const userExist = await User.findOne({
      where: { email },
      include: [Patient],
      transaction: t,
    });

    

    if (!userExist || !userExist.Patient)
      throw new Error("Patient profile not found");

    const patientId = userExist.Patient.patient_id;

    const doctorRecord = await Doctor.findByPk(doctorId, { transaction: t });
    if (!doctorRecord) throw new Error("This doctor doesn't exist");

    const docDep = await DoctorDepartment.findOne({
      where: { doctor_id: doctorId },
      transaction: t,
    });
    if (!docDep) throw new Error("Doctor is not assigned to a department");

    const treatmentPreformed = await Treatment.findOne({
      where: {
        treatment_name: description,
        department_id: docDep.department_id,
      },
      transaction: t,
    });

    if (!treatmentPreformed)
      throw new Error("Doctor does not perform this treatment");

    const room = await Room.findOne({
      where: { department_id: docDep.department_id },
      transaction: t,
    });

    const newStart = new Date(appointment_date_time);
    const duration = treatmentPreformed.average_duration || 30;
    const newEnd = new Date(newStart.getTime() + duration * 60000);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = days[newStart.getDay()];
    const work = await WorkSchedule.findOne({
      where: {
        doctor_id: doctorRecord.doctor_id,
        schedule_day: dayName,
      },
    });

    if (!work) {
      throw new Error("this doctor doesnt work on " + dayName + " ' s");
    }

    const allAppointments = await Appointment.findAll({ transaction: t });

    for (const app of allAppointments) {
      if (app.doctor_id === doctorId || app.room_id === room.room_id) {
        const existingStart = new Date(app.appointment_date_time);
        const existingEnd = new Date(
          existingStart.getTime() + app.duration * 60000,
        );

        const isOverlapping = newStart < existingEnd && newEnd > existingStart;

        if (isOverlapping) {
          throw new Error(
            `Choose another time ,Slot already taken until ${existingEnd.toLocaleTimeString()}`,
          );
        }
      }
    }

    const newAppointment = await Appointment.create(
      {
        patient_id: patientId,
        doctor_id: doctorId,
        room_id: room.room_id,
        appointment_date_time: newStart,
        duration: duration,
        description,
        status: "pending",
      },
      { transaction: t },
    );

    const newRecord = await DentalRecord.create(
      {
        patient_id: patientId,
        doctor_id: doctorId,
        appointment_id: newAppointment.appointment_id,
        tooth: "TBD",
        dental_condition: "Pending Examination",
        notes: `Initial booking: ${description}`,
      },
      { transaction: t },
    );

    await PatientTreatment.create(
      {
        appointment_id: newAppointment.appointment_id,
        treatment_id: treatmentPreformed.treatment_id,
        dental_record_id: newRecord.dental_record_id,
        pt_description: `Planned: ${description}`,
      },
      { transaction: t },
    );

    await t.commit();
    return newAppointment;
  } catch (err) {
    if (t) await t.rollback();
    throw new Error(err.message);
  }
};

const getAllApp = async () => {
  try {
    return await Appointment.findAll({
      include: [
        { model: Patient, include: [User] },
        {
          model: Doctor,
          include: [{ model: User, attributes: ["first_name", "last_name"] }],
        },
        { model: Room },
        {
          model: PatientTreatment,
          as: "PatientTreatments",
          include: [Treatment],
        },
        { model: DentalRecord },
      ],
      order: [["appointment_date_time", "ASC"]],
    });
  } catch (err) {
    throw new Error("Could not fetch appointments: " + err.message);
  }
};

const deleteAppoint = async (appointment_id) => {
  const t = await sequelize.transaction();
  try {
    const appointmentExist = await Appointment.findByPk(appointment_id);
    if (!appointmentExist) throw new Error("This appointment doesn't exist");

    await PatientTreatment.destroy({
      where: { appointment_id },
      transaction: t,
    });
    await DentalRecord.destroy({ where: { appointment_id }, transaction: t });
    await appointmentExist.destroy({ transaction: t });

    await t.commit();
    return { message: "Appointment deleted successfully" };
  } catch (err) {
    await t.rollback();
    throw new Error("Could not delete: " + err.message);
  }
};

const getAppById = async (appointment_id) => {
  try {
    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        { model: Patient, include: [User] },
        { model: Doctor, include: [User] },
        { model: Room },
        {
          model: PatientTreatment,
          as: "PatientTreatments",
          include: [Treatment],
        },
        { model: DentalRecord },
      ],
    });
    if (!appointment) throw new Error("Not found");
    return appointment;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateAppointment = async (appointment_id, updateData) => {
  const { doctorId, appointment_date_time, description, status } = updateData;
  const t = await sequelize.transaction();

  try {
    const appointment = await Appointment.findByPk(appointment_id, {
      transaction: t,
    });
    if (!appointment) throw new Error("Appointment not found");

    let finalDoctorId = doctorId ? Number(doctorId) : appointment.doctor_id;
    let finalDescription = description || appointment.description;
    let finalDuration = appointment.duration;
    let finalRoomId = appointment.room_id;

    if (doctorId || description) {
      const docDep = await DoctorDepartment.findOne({
        where: { doctor_id: finalDoctorId },
        transaction: t,
      });
      if (!docDep) throw new Error("Doctor is not assigned to a department");

      const treatment = await Treatment.findOne({
        where: {
          treatment_name: finalDescription,
          department_id: docDep.department_id,
        },
        transaction: t,
      });

      if (!treatment)
        throw new Error("This doctor doesn't perform this treatment");

      finalDuration = treatment.average_duration || 30;
      const room = await Room.findOne({
        where: { department_id: docDep.department_id },
        transaction: t,
      });
      finalRoomId = room.room_id;
    }

    const newStart = appointment_date_time
      ? new Date(appointment_date_time)
      : new Date(appointment.appointment_date_time);
    const newEnd = new Date(newStart.getTime() + finalDuration * 60000);

    const allApps = await Appointment.findAll({ transaction: t });

    for (const app of allApps) {
      if (app.appointment_id === Number(appointment_id)) continue;

      if (app.doctor_id === finalDoctorId || app.room_id === finalRoomId) {
        const existingStart = new Date(app.appointment_date_time);
        const existingEnd = new Date(
          existingStart.getTime() + app.duration * 60000,
        );

        const isOverlapping = newStart < existingEnd && newEnd > existingStart;

        if (isOverlapping) {
          throw new Error(
            `Time slot conflict with Appointment #${app.appointment_id}`,
          );
        }
      }
    }

    await appointment.update(
      {
        doctor_id: finalDoctorId,
        room_id: finalRoomId,
        appointment_date_time: newStart,
        duration: finalDuration,
        description: finalDescription,
        appointment_status: status || appointment.appointment_status,
      },
      { transaction: t },
    );

   

    await t.commit();
    return appointment;
  } catch (err) {
    if (t) await t.rollback();
    throw new Error(err.message);
  }
};

module.exports = {
  create,
  getAllApp,
  deleteAppoint,
  getAppById,
  updateAppointment,
};
