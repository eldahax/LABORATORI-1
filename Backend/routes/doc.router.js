const express = require("express");
const router = express.Router();

const docController = require("../controllers/doctorController");

const { protect, authorize } = require("../auth/authMiddleWear")
router.post("/", protect, authorize("receptionist", "admin"), docController.add);
router.get("/", protect, authorize("admin", "receptionist", "patient", "doctor"), docController.getAllDocs);
router.get("/:id", protect, authorize("admin"), docController.getDocById);
router.put("/:id", protect, authorize("admin"), docController.update);
router.delete("/:id", protect, authorize("admin"), docController.deleteDoctor);

module.exports = router;