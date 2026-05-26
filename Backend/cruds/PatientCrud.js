const { User, Patient, PatientAllergy, Role, UserRole } = require("../models");
const { createUser, updateUser } = require("./userCrud");

const bcrypt = require('bcryptjs')
const addPatient = async (
    first_name,
    last_name,
    email,
    phone_number,
    password,
    date_of_birth,
    allergy_name
) => {

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name,
        last_name,
        email,
        phone_number,
        password_hash
    });
    const role = await Role.findOne({
        where: { role_name: "patient" }

    });

    if (!role) throw new Error("Patient role not found");

    await UserRole.create({
        user_id: user.user_id,
        role_id: role.role_id
    });

    const patient = await Patient.create({
        user_id: user.user_id,
        date_of_birth
    });

    await PatientAllergy.create({
        patient_id: patient.patient_id,
        allergy_name
    });

    return {
        user_id: user.user_id,
        patient_id: patient.patient_id,
        allergy_name: patient.allergy_name
    };
};


const getAllPatients = async () => {
    return await Patient.findAll({
        include: [
            {
                model: User,
                attributes: ["user_id", "first_name", "last_name", "email", "phone_number"]
            },
            {
                model: PatientAllergy,
                attributes: ["allergy_name"]
            }
        ]
    });
};

const getPatientById = async (patient_id) => {
    const patient = await Patient.findByPk(patient_id, {
        include: [
            {
                model: User,
                attributes: ["user_id", "first_name", "last_name", "email", "phone_number"]
            }, {
                model: PatientAllergy,
                attributes: ["allergy_name"]
            }
        ]
    });

    if (!patient) {
        throw new Error("Patient not found");
    }

    return patient;
};

const updatePatient = async (patient_id, data) => {
    const patient = await Patient.findByPk(patient_id);

    if (!patient) {
        throw new Error("Patient not found");
    }


    await updateUser(patient.user_id, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number
    });

    await patient.update({
        date_of_birth: data.date_of_birth ?? patient.date_of_birth,

    });
    await PatientAllergy.destroy({
        where: { patient_id: patient.patient_id }
    });

    if (data.allergy_name && Array.isArray(data.allergy_name) && data.allergy_name.length > 0) {
        const allergyData = data.allergy_name.map((a) => ({
            patient_id: patient.patient_id,
            allergy_name: a
        }));

        await PatientAllergy.bulkCreate(allergyData);
    }

    return {
        patient_id: patient.patient_id,
        user_id: patient.user_id,
        date_of_birth: patient.date_of_birth,
        allergy_name: patient.allergy_name
    };
};

const deletePatient = async (patient_id) => {
    const patient = await Patient.findByPk(patient_id);

    if (!patient) {
        throw new Error("Patient not found");
    }

    const userId = patient.user_id;

    await patient.destroy();
    await User.destroy({ where: { user_id: userId } });

    return { message: "Patient deleted successfully" };
};

module.exports = {
    addPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};