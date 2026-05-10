const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/", departmentController.addDep);    
router.put("/:id", departmentController.update);
router.get("/",departmentController.getAll);
router.get("/:id", departmentController.getById);
router.delete("/:id",departmentController.deleDep)
module.exports = router;

