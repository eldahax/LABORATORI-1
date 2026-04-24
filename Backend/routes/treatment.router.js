const express = require("express");
const router = express.Router();

const controller = require("../controllers/treatmentController");

router.post("/", controller.createTreatment);
router.get("/", controller.getAllTreatments);
router.get("/:id", controller.getTreatmentById);
router.put("/:id", controller.updateTreatment);
router.delete("/:id", controller.deleteTreatment);

module.exports = router;