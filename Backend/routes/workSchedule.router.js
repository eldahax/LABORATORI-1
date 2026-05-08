const express = require("express");
const router = express.Router();

const workScheduleController = require("../controllers/workScheduleController");

router.post("/", workScheduleController.createWorkSchedule);
router.get("/", workScheduleController.getAllWorkSchedules);
router.get("/:id", workScheduleController.getWorkScheduleById);
router.put("/:id", workScheduleController.updateWorkSchedule);
router.delete("/:id", workScheduleController.deleteWorkSchedule);

module.exports = router;