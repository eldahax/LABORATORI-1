const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

const { protect, authorize } = require("../auth/authMiddleWear");

router.get("/", protect, authorize("admin"), paymentController.getAllPayments);
router.get("/:id", protect, authorize("admin"), paymentController.getPaymentById);
router.get("/invoice/:invoiceId", protect, authorize("admin"), paymentController.getPaymentsByInvoice);

module.exports = router;
