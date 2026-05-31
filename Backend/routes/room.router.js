const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");
const { protect, authorize } = require("../auth/authMiddleWear");

router.post("/", protect, authorize("admin", "receptionist"), roomController.createRoom);
router.get("/", protect, authorize("admin", "receptionist"), roomController.getAllRooms);
router.get("/:id", protect, authorize("admin"), roomController.getRoomById);
router.put("/:id", protect, authorize("admin"), roomController.updateRoom);
router.delete("/:id", protect, authorize("admin"), roomController.deleteRoom);

module.exports = router;