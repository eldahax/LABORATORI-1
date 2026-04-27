const docService = require("../cruds/docCrud.js");
const userService = require("../cruds/userCrud.js");

const add = async (req, res) => {
  try {

    const{first_name,last_name,email,phone_number,password,specialization,license_number,years_experience,description,department_name}=req.body
    const result = await docService.createDoc(
      first_name,
      last_name,
      email,
      phone_number,
      password,
      specialization,
      license_number,
      years_experience,
      description,
      department_name
    );
    res.json(result);
  } catch (err) {
  
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await docService.updateDoc(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllDocs = async (req, res) => {
  try {
    const result = await docService.readallDocs();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDocById = async (req, res) => {
  try {
    const result = await docService.getId(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: "Doctor not found" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const result = await docService.deleteDoc(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  add,
  update,
  getAllDocs,
  getDocById,
  deleteDoctor,
};