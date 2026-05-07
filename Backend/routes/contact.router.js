const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

router.post("/", contactController.add);
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.delete("/:id", contactController.deleteContact);
router.put("/:id", contactController.update);

module.exports = router;