const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");

const { protect, authorize } = require("../auth/authMiddleWear")
router.post("/", protect, authorize("admin"), departmentController.addDep);
router.put("/:id", protect, authorize("admin"), departmentController.update);
router.get("/", protect, authorize("admin", "receptionist"), departmentController.getAll);
router.get("/:id", protect, authorize("admin"), departmentController.getById);
router.delete("/:id", protect, authorize("admin"), departmentController.deleDep)

module.exports = router;
