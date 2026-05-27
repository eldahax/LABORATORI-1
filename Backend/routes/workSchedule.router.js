const express = require("express");
const router = express.Router();

const workScheduleController = require("../controllers/workScheduleController");

const { protect, authorize } = require("../auth/authMiddleWear");
router.post("/", protect, authorize("admin"), workScheduleController.createWorkSchedule);
router.get("/", protect, authorize("admin", "receptionist", "doctor"), workScheduleController.getAllWorkSchedules);
router.get("/:id", protect, authorize("admin", "receptionist"), workScheduleController.getWorkScheduleById);
router.put("/:id", protect, authorize("admin", "receptionist"), workScheduleController.updateWorkSchedule);
router.delete("/:id", protect, authorize("admin"), workScheduleController.deleteWorkSchedule);

module.exports = router;