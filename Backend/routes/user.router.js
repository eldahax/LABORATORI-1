const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { protect, authorize } = require("../auth/authMiddleWear");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.get("/", protect, authorize("admin"), userController.getAllUsers);
router.delete("/:id", protect, authorize("admin"), userController.deleteUser);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);



router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);


module.exports = router;