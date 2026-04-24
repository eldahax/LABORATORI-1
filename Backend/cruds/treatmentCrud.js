const { Treatment, Department } = require("../models");

const createTreatment = async (
    treatment_name,
    price,
    description,
    average_duration,
    department_name
) => {
    const department = await Department.findOne({
        where: { department_name }
    });

    if (!department) {
        throw new Error("Department not found");
    }

    return await Treatment.create({
        treatment_name,
        price,
        description,
        average_duration,
        department_id: department.department_id
    });
};

const getAllTreatments = async () => {
    return await Treatment.findAll({
        include: [
            {
                model: Department,
                attributes: ["department_name"]
            }
        ]
    });
};

const getTreatmentById = async (id) => {
    const treatment = await Treatment.findByPk(id, {
        include: [
            {
                model: Department,
                attributes: ["department_name"]
            }
        ]
    });

    if (!treatment) throw new Error("Treatment not found");

    return treatment;
};

const updateTreatment = async (id, data) => {
    const treatment = await Treatment.findByPk(id);

    if (!treatment) throw new Error("Treatment not found");

    let department_id = treatment.department_id;

    if (data.department_name) {
        const dep = await Department.findOne({
            where: { department_name: data.department_name }
        });

        if (!dep) throw new Error("Department not found");

        department_id = dep.department_id;
    }

    return await treatment.update({
        treatment_name: data.treatment_name,
        price: data.price,
        description: data.description,
        average_duration: data.average_duration,
        department_id
    });
};

const deleteTreatment = async (id) => {
    return await Treatment.destroy({
        where: { treatment_id: id }
    });
};

module.exports = {
    createTreatment,
    getAllTreatments,
    getTreatmentById,
    updateTreatment,
    deleteTreatment
};