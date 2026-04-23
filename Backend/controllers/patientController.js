const patientService = require("../cruds/PatientCrud");


const insertPatient = async (req, res) => {
    try {
        const patient = await patientService.addPatient(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.phone_number,
            req.body.password,
            req.body.date_of_birth,
            req.body.allergy_name
        );

        res.status(201).json(patient);
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        res.json(patient);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};


const updatePatient = async (req, res) => {
    try {
        const updated = await patientService.updatePatient(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const deletePatient = async (req, res) => {
    try {
        const result = await patientService.deletePatient(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    insertPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};