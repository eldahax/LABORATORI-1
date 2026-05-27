const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

const { protect, authorize } = require("../auth/authMiddleWear");
router.post("/", protect, authorize("patient", "admin"), reviewController.createReview);
router.get("/", protect, authorize("patient", "admin", "receptionist"), reviewController.getAll);
router.get("/:id", protect, authorize("admin"), reviewController.getById);
router.delete("/:id", protect, authorize("patient", "admin"), reviewController.deleteReview);

module.exports = router;