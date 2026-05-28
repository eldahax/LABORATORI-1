const { WorkSchedule, Doctor,User } = require("../models");

const createWorkSchedule = async (
    doctor_id,
    schedule_day,
    start_time,
    end_time,
    status
) => {
    try {

        const doctor = await Doctor.findByPk(doctor_id);

        if (!doctor) throw new Error("Doctor not found");

        const workSchedule = await WorkSchedule.create({
            doctor_id: Number(doctor_id),
            schedule_day,
            start_time,
            end_time,
            status: status || "inactive",
        });

        return {
            message: "Work schedule created successfully",
            workSchedule,
        };

    } catch (err) {
        throw err;
    }
};
const getAllWorkSchedules = async (user) => {
    try{
         let whereCondition = {};
    const roles = user.roles || [];

  
    if (!roles.includes("admin")) {

   
      if (roles.includes("patient")) {
        whereCondition.patient_id = user.patient_id;
      }

     
      if (roles.includes("doctor")) {
        whereCondition.doctor_id = user.doctor_id;
      }
    }

  return await WorkSchedule.findAll({
      where: whereCondition,
    include: [
      {
        model: Doctor,
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
      },
    ],
  });
}
catch(err){
  throw new Error(
      "Could not fetch workschedule"
    );
}
};

const getWorkScheduleById = async (id) => {

    const workSchedule = await WorkSchedule.findByPk(id, {
        include: [
            {
                model: Doctor,
                attributes: ["doctor_id"],
            },
        ],
    });

    if (!workSchedule) {
        throw new Error("Work schedule not found");
    }

    return workSchedule;
};

const updateWorkSchedule = async (id, data) => {

    const workSchedule = await WorkSchedule.findByPk(id);

    if (!workSchedule) {
        throw new Error("Work schedule not found");
    }

    let doctor_id = workSchedule.doctor_id;

    if (data.doctor_id) {

        const doctor = await Doctor.findByPk(data.doctor_id);

        if (!doctor) {
            throw new Error("Doctor not found");
        }

        doctor_id = data.doctor_id;
    }

    await workSchedule.update({
        doctor_id,
        schedule_day: data.schedule_day,
        start_time: data.start_time,
        end_time: data.end_time,
        status: data.status,
    });

    return { message: "Work schedule updated" };
};

const deleteWorkSchedule = async (id) => {

    const workSchedule = await WorkSchedule.findByPk(id);

    if (!workSchedule) {
        throw new Error("Work schedule not found");
    }

    await WorkSchedule.destroy({
        where: { work_schedule_id: id },
    });

    return { message: "Work schedule deleted" };
};

module.exports = {
    createWorkSchedule,
    getAllWorkSchedules,
    getWorkScheduleById,
    updateWorkSchedule,
    deleteWorkSchedule,
};