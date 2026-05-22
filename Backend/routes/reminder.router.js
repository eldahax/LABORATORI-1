const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");

router.post("/", reminderController.createReminder);
router.get("/", reminderController.getAllReminders);
router.get("/:id", reminderController.getReminderById);
router.put("/:id", reminderController.updateReminder);
router.delete("/:id", reminderController.deleteReminder);
router.patch("/:id/sent", reminderController.markAsSent);
router.patch("/appointments/:id/confirm", reminderController.confirmAppointment);

module.exports = router;