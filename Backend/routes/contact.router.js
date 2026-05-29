const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const{protect,authorize}=require("../auth/authMiddleWear")

router.post("/", protect,authorize("patient","admin"),contactController.add);
router.get("/", protect,authorize("admin","receptionist"), contactController.getAllContacts);
router.get("/:id",  protect,authorize("admin"),contactController.getContactById);
router.delete("/:id",protect,authorize("admin"), contactController.deleteContact);

module.exports = router