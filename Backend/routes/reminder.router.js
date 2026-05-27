const express = require("express");
const router = express.Router();

const reminderController = require("../controllers/reminderController");

const { protect, authorize } = require("../auth/authMiddleWear");
router.post("/", protect, authorize("patient", "admin"), reminderController.createReminder);
router.get("/", protect, authorize("doctor", "patient", "admin"), reminderController.getAllReminders);
router.get("/:id", protect, authorize("doctor", "admin"), reminderController.getReminderById);
router.put("/:id", protect, authorize("admin", "doctor"), reminderController.updateReminder);
router.delete("/:id", protect, authorize("admin"), reminderController.deleteReminder);
router.patch("/:id/sent", protect, authorize("doctor", "admin"), reminderController.markAsSent);
router.patch("/appointments/:id/confirm", protect, authorize("doctor", "admin"), reminderController.confirmAppointment);


module.exports = router;