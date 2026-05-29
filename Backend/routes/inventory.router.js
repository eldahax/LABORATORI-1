const express = require("express");
const router = express.Router();
const inventController = require("../controllers/inventoryController");

const { protect, authorize } = require("../auth/authMiddleWear")

router.post("/", protect, authorize("admin", "receptionist"), inventController.add);
router.put("/:id", protect, authorize("admin", "receptionist"), inventController.update);
router.get("/", protect, authorize("admin", "receptionist"), inventController.getAllInvent);
router.get("/:id", protect, authorize("admin", "receptionist"), inventController.getbyId);
router.delete("/:id", protect, authorize("admin"), inventController.deleteI)
module.exports = router;