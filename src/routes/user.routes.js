const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/user.controller");

// ====================
// CURRENT USER PROFILE
// ====================
// router.get("/profile", authMiddleware, userController.getProfile);

// ====================
// GET ALL USERS
// ====================
// (optional: later you can protect with adminMiddleware)
router.get(
  "/",
  authMiddleware,
  require("../middleware/adminMiddleware"),
  userController.getAllUsers
);

module.exports = router;
