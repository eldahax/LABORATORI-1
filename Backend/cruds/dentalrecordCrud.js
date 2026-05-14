const { DentalRecord, User, Patient, Doctor, Appointment } = require("../models");

const readAllDentalRecords = async () => {
  return await DentalRecord.findAll({
    include: [
      {
        model: Appointment,
      },
      {
        model: Patient,
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name", "email"],
          },
        ],
      },
      {
        model: Doctor,
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name", "email"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};


const getDentalRecordById = async (id) => {
  const record = await DentalRecord.findByPk(id, {
    include: [
      { model: Appointment },
      {
        model: Patient,
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name", "email"],
          },
        ],
      },
      {
        model: Doctor,
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name", "email"],
          },
        ],
      },
    ],
  });

  if (!record) throw new Error("Dental record not found");

  return record;
};


const updateDentalRecord = async (id, data) => {
  const record = await DentalRecord.findByPk(id);

  if (!record) throw new Error("Dental record not found");

 
  if (data.tooth !== undefined && data.tooth.trim() === "") {
    throw new Error("Tooth cannot be empty");
  }

  await record.update({
    tooth: data.tooth ?? record.tooth,
    dental_condition: data.dental_condition ?? record.dental_condition,
    notes: data.notes ?? record.notes,
  });

  return {
    message: "Dental record updated successfully",
    data: record,
  };
};


const deleteDentalRecord = async (id) => {
  const record = await DentalRecord.findByPk(id);

  if (!record) throw new Error("Dental record not found");

  await record.destroy();

  return {
    message: "Dental record deleted successfully",
  };
};

module.exports = {
  readAllDentalRecords,
  getDentalRecordById,
  updateDentalRecord,
  deleteDentalRecord,
};