const express = require("express");
const router = express.Router();

const dentalController = require("../controllers/dentalrecordController");

router.get("/", dentalController.getAll);
router.get("/:id", dentalController.getById);
router.put("/:id", dentalController.update);
router.delete("/:id", dentalController.remove);

module.exports = router;