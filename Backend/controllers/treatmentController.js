const treatmentService = require("../cruds/treatmentCrud");

const createTreatment = async (req, res) => {
    try {
        const result = await treatmentService.createTreatment(
            req.body.treatment_name,
            req.body.price,
            req.body.description,
            req.body.average_duration,
            req.body.department_name
        );

        res.json({
            message: "Treatment created successfully",
            data: result
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllTreatments = async (req, res) => {
    try {
        const data = await treatmentService.getAllTreatments();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTreatmentById = async (req, res) => {
    try {
        const data = await treatmentService.getTreatmentById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const updateTreatment = async (req, res) => {
    try {
        const data = await treatmentService.updateTreatment(
            req.params.id,
            req.body
        );

        res.json({
            message: "Treatment updated successfully",
            data
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteTreatment = async (req, res) => {
    try {
        await treatmentService.deleteTreatment(req.params.id);

        res.json({
            message: "Treatment deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createTreatment,
    getAllTreatments,
    getTreatmentById,
    updateTreatment,
    deleteTreatment
};