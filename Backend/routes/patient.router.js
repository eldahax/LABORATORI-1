const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

const { protect, authorize } = require("../auth/authMiddleWear")
router.post("/add", protect, authorize("admin", "receptionist"), patientController.insertPatient);
router.get("/", protect, authorize("admin", "receptionist"), patientController.getAllPatients);
router.get("/:id", protect, authorize("admin"), patientController.getPatientById);
router.put("/:id", protect, authorize("admin"), patientController.updatePatient);
router.delete("/:id", protect, authorize("admin"), patientController.deletePatient);

module.exports = router;