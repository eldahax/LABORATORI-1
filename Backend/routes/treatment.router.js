const express = require("express");
const router = express.Router();

const controller = require("../controllers/treatmentController");

const { protect, authorize } = require("../auth/authMiddleWear")
router.post("/", protect, authorize("admin", "receptionist"), controller.createTreatment);
router.get("/", protect, authorize("admin", "doctor", "receptionist", "patient"), controller.getAllTreatments);
router.get("/:id", protect, authorize("admin","receptionist"), controller.getTreatmentById);
router.put("/:id", protect, authorize("admin","receptionist"), controller.updateTreatment);
router.delete("/:id", protect, authorize("admin", "receptionist"), controller.deleteTreatment);

module.exports = router;