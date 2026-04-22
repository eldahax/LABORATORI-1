const { User } = require("../models");
const bcrypt = require("bcryptjs");

const createUser = async (first_name, last_name, email, phone_number, password) => {
  const exists = await User.findOne({ where: { email } });

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  return await User.create({
    first_name,
    last_name,
    email,
    phone_number,
    password_hash: hashed
  });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const getAllUsers = async () => {
  return await User.findAll({
    attributes: ["user_id", "first_name", "last_name", "email", "phone_number"]
  });
};

const getUserById = async (user_id) => {
  return await User.findByPk(user_id, {
    attributes: ["user_id", "first_name", "last_name", "email", "phone_number"]
  });
};

const updateUser = async (user_id, data) => {
  const user = await User.findByPk(user_id);

  if (!user) throw new Error("User not found");

  return await user.update({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.phone_number
  });
};

const deleteUser = async (user_id) => {
  return await User.destroy({ where: { user_id } });
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};