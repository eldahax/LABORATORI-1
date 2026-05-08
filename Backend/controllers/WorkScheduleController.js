const workScheduleService = require("../cruds/workScheduleCrud");

const createWorkSchedule = async (req, res) => {
    try {

        const {
            doctor_id,
            schedule_day,
            start_time,
            end_time,
            status
        } = req.body;

        const result = await workScheduleService.createWorkSchedule(
            doctor_id,
            schedule_day,
            start_time,
            end_time,
            status
        );

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateWorkSchedule = async (req, res) => {
    try {

        const result = await workScheduleService.updateWorkSchedule(
            req.params.id,
            req.body
        );

        res.json(result);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllWorkSchedules = async (req, res) => {
    try {

        const result = await workScheduleService.getAllWorkSchedules();

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getWorkScheduleById = async (req, res) => {
    try {

        const result = await workScheduleService.getWorkScheduleById(
            req.params.id
        );

        res.json(result);

    } catch (err) {
        res.status(404).json({ error: "Work schedule not found" });
    }
};

const deleteWorkSchedule = async (req, res) => {
    try {

        const result = await workScheduleService.deleteWorkSchedule(
            req.params.id
        );

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createWorkSchedule,
    updateWorkSchedule,
    getAllWorkSchedules,
    getWorkScheduleById,
    deleteWorkSchedule,
};