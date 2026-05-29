const express = require("express");
const router = express.Router();

const dentalController = require("../controllers/dentalrecordController");

const {protect,authorize,} = require("../auth/authMiddleWear");

router.get( "/",protect,authorize("admin", "doctor"),dentalController.getAll);
router.get("/:id",protect,  authorize("admin", "doctor"),dentalController.getById);
router.put("/:id",protect,authorize("admin", "doctor"),dentalController.update);
router.delete("/:id",protect,authorize("admin", "doctor"),dentalController.remove);

module.exports = router;