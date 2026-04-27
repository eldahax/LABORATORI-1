const express = require("express");
const router = express.Router();
const docController = require("../controllers/doctorController");

router.post("/", docController.add);           
router.get("/", docController.getAllDocs);     
router.get("/:id", docController.getDocById);  
router.put("/:id", docController.update);
router.delete("/:id", docController.deleteDoctor);

module.exports = router;