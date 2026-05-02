const express = require("express");
const router = express.Router();
const inventController = require("../controllers/inventoryController");

router.post("/", inventController.add);    
router.put("/:id", inventController.update);
router.get("/",inventController.getAllInvent);
router.get("/:id", inventController.getbyId);
router.delete("/:id",inventController.deleteI)
module.exports = router;