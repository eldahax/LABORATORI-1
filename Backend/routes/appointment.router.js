const express = require("express");
const router = express.Router();
const appointmentController =require("../controllers/appointmentController");

const {  protect, authorize} = require("../auth/authMiddleWear");
router.post( "/", protect, authorize("patient", "admin","receptionist","doctor"),appointmentController.createApp);
router.get("/",protect,authorize("patient", "admin","doctor","receptionist"),appointmentController.getAll);
router.get( "/:id", protect,authorize("patient", "admin","receptionist"), appointmentController.getById);
router.put( "/:id", protect,authorize("patient", "admin","receptionist"), appointmentController.update);
router.delete("/:id", protect,authorize("patient", "admin"),appointmentController.deleteApp);

module.exports = router;

