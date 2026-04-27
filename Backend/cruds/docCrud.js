const { User, Doctor, DoctorDepartment, Department, Role, UserRole } = require("../models");
const bcrypt = require("bcryptjs");

const createDoc = async (first_name,
      last_name,
      email,
      phone_number,
      password,
      specialization,
      license_number,
      years_experience,
      description,
      department_name)=> {

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password_hash: hashed
    })

    const role = await Role.findOne({
      where: { role_name: "doctor" }
    
    });

    if (!role) throw new Error("Doctor role not found");

    await UserRole.create({
      user_id: user.user_id,
      role_id: role.role_id
    });

    const doctor = await Doctor.create({
      user_id: user.user_id,
      specialization,
      license_number,
      years_experience,
      description,
      status: "active"
    });

    const department = await Department.findOne({
      where: { department_name }
     
    });

    if (!department) throw new Error("Department not found");

    await DoctorDepartment.create({
      doctor_id: doctor.doctor_id,
      department_id: department.department_id
    });

   

    return { message: "Doctor created successfully" };

  } catch (err) {
    
    throw err;
  }
};



const readallDocs = async () => {
  return await Doctor.findAll({
    attributes: [
      "doctor_id",
      "specialization",
      "license_number",
      "years_experience",
      "description",
      "status"
    ],
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name", "email", "phone_number"]
      }
    ]
  });
};

const getId = async (id) => {
  const doctor = await Doctor.findByPk(id, {
    include: [User, Department]
  });
  if (!doctor) throw new Error("Doctor not found");
  return doctor;
};

const updateDoc = async (id, data) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) throw new Error("Doctor not found");

  const user = await User.findByPk(doctor.user_id);

  await user.update({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.phone_number
  });

  await doctor.update({
    specialization: data.specialization,
    license_number: data.license_number,
    years_experience: data.years_experience,
    description: data.description
  });


  return { message: "Doctor updated" };
};

const deleteDoc = async (id) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) throw new Error("Doctor not found");

  await DoctorDepartment.destroy({ where: { doctor_id: doctor.doctor_id } });
  await Doctor.destroy({ where: { doctor_id: doctor.doctor_id } });
  await User.destroy({ where: { user_id: doctor.user_id } });

  return { message: "Doctor deleted" };
};

module.exports = {
  createDoc,
  readallDocs,
  getId,
  updateDoc,
  deleteDoc
};