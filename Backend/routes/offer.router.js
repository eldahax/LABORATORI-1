const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");

const{protect,authorize}=require("../auth/authMiddleWear")

router.post("/",protect,authorize("admin","receptionist"), offerController.addOffer);
router.get("/",protect,authorize("admin","receptionist","doctor"), offerController.getAllOffers);
router.get("/:id",protect,authorize("admin","receptionist"), offerController.getOfferById);
router.put("/:id",protect,authorize("admin","receptionist"), offerController.updateOffer);
router.delete("/:id",protect,authorize("admin","receptionist"), offerController.deleteOffer);

module.exports = router;