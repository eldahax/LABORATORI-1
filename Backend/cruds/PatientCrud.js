const {
    sequelize,
    User,
    Patient,
    PatientAllergy,
    Role,
    UserRole,
    DentalRecord,
    Appointment
} = require("../models");

const bcrypt = require("bcryptjs");

const addPatient = async (
    first_name,
    last_name,
    email,
    phone_number,
    password,
    date_of_birth,
    allergy_name
) => {

    const t = await sequelize.transaction();

    try {

        const existingUser = await User.findOne({
            where: { email },
            transaction: t
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const role = await Role.findOne({
            where: { role_name: "patient" },
            transaction: t
        });

        if (!role) {
            throw new Error("Patient role not found");
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email,
            phone_number,
            password_hash
        }, { transaction: t });

        await UserRole.create({
            user_id: user.user_id,
            role_id: role.role_id
        }, { transaction: t });

        const patient = await Patient.create({
            user_id: user.user_id,
            date_of_birth
        }, { transaction: t });

        if (allergy_name) {

            if (Array.isArray(allergy_name)) {

                const allergies = allergy_name.map((a) => ({
                    patient_id: patient.patient_id,
                    allergy_name: a
                }));

                await PatientAllergy.bulkCreate(
                    allergies,
                    { transaction: t }
                );

            } else {
                await PatientAllergy.create({
                    patient_id: patient.patient_id,
                    allergy_name
                }, { transaction: t });
            }
        }
        await t.commit();

        return {
            message: "Patient created successfully",
            user_id: user.user_id,
            patient_id: patient.patient_id
        };

    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};

const getAllPatients = async () => {

    try {

        return await Patient.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        "user_id",
                        "first_name",
                        "last_name",
                        "email",
                        "phone_number"
                    ]
                },
                {
                    model: PatientAllergy,
                    attributes: ["allergy_name"]
                }
            ],
            order: [["patient_id", "DESC"]]
        });

    } catch (err) {

        throw new Error("Could not fetch patients: " + err.message);
    }
};

const getPatientById = async (patient_id) => {

    try {

        const patient = await Patient.findByPk(patient_id, {
            include: [
                {
                    model: User,
                    attributes: [
                        "user_id",
                        "first_name",
                        "last_name",
                        "email",
                        "phone_number"
                    ]
                },
                {
                    model: PatientAllergy,
                    attributes: ["allergy_name"]
                }
            ]
        });

        if (!patient) {
            throw new Error("Patient not found");
        }
        return patient;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updatePatient = async (patient_id, updateData) => {
    const t = await sequelize.transaction();
    try {
        const patient = await Patient.findByPk(patient_id,
            { transaction: t }
        );

        if (!patient) {
            throw new Error("Patient not found");
        }
        const user = await User.findByPk(patient.user_id,
            { transaction: t }
        );

        if (!user) {
            throw new Error("User not found");
        }
        if (updateData.email && updateData.email !== user.email) {

            const emailExists = await User.findOne({
                where: { email: updateData.email },
                transaction: t
            });
            if (emailExists) {
                throw new Error("Email already exists");
            }
        }
        await user.update({
            first_name: updateData.first_name || user.first_name,
            last_name: updateData.last_name || user.last_name,
            email: updateData.email || user.email,
            phone_number: updateData.phone_number || user.phone_number
        }, { transaction: t });

        await patient.update({
            date_of_birth: updateData.date_of_birth || patient.date_of_birth
        }, { transaction: t });

        await PatientAllergy.destroy({
            where: { patient_id: patient.patient_id },
            transaction: t
        });

        if (updateData.allergy_name && Array.isArray(updateData.allergy_name)
        ) {
            const allergies = updateData.allergy_name.map((a) => ({
                patient_id: patient.patient_id,
                allergy_name: a
            }));

            await PatientAllergy.bulkCreate(
                allergies,
                { transaction: t }
            );
        }
        await t.commit();
        return { message: "Patient updated successfully" };

    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};

const deletePatient = async (patient_id) => {
    const t = await sequelize.transaction();

    try {

        const patient = await Patient.findByPk(patient_id,
            { transaction: t }
        );

        if (!patient) {
            throw new Error("Patient not found");
        }
        const ap=await Appointment.findOne( {where: { patient_id: patient.patient_id } , transaction: t });
        if(ap){  throw new Error("this patient cant be delted due to dental history")}

        const userId = patient.user_id;

        await PatientAllergy.destroy({
            where: { patient_id: patient.patient_id },
            transaction: t
        });

        await UserRole.destroy({
            where: { user_id: userId },
            transaction: t
        });

        await patient.destroy({ transaction: t });

        await User.destroy({
            where: { user_id: userId },
            transaction: t
        });

        await t.commit();
        return { message: "Patient deleted successfully" };

    } catch (err) {
        await t.rollback();
        throw new Error("Could not delete patient: " + err.message);
    }
};

module.exports = {
    addPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};