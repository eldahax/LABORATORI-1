const express = require("express");
const router = express.Router();
const appointmentController =require("../controllers/appointmentController");

const {  protect, authorize} = require("../auth/authMiddleWear");
router.post( "/", protect, authorize("patient", "admin"),appointmentController.createApp);
router.get("/",protect,appointmentController.getAll);
router.get( "/:id", protect, appointmentController.getById);
router.put( "/:id", protect, appointmentController.update);
router.delete("/:id", protect,authorize("patient", "admin"),appointmentController.deleteApp);

module.exports = router;

