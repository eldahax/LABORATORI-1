const { WorkSchedule, Doctor } = require("../models");

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

const getAllWorkSchedules = async () => {

    return await WorkSchedule.findAll({
        include: [
            {
                model: Doctor,
                attributes: ["doctor_id"],
            },
        ],
    });
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