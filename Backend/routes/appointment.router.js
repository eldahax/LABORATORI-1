const express = require("express");
const router = express.Router();
const appointmentController=require("../controllers/appointmentController");

router.post("/",appointmentController.createApp);
router.put("/:id",appointmentController.update);
router.get("/",appointmentController.getAll);
router.get("/:id",appointmentController.getById);
router.delete("/:id",appointmentController.deleteApp);

module.exports=router;