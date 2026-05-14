const dentalService = require("../cruds/dentalrecordCrud");


const getAll = async (req, res) => {
  try {
    const result = await dentalService.readAllDentalRecords();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await dentalService.getDentalRecordById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await dentalService.updateDentalRecord(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const remove = async (req, res) => {
  try {
    const result = await dentalService.deleteDentalRecord(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  update,
  remove,
};