const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/admin.controller");

// ====================
// ADMIN USERS
// ====================
router.get("/users", adminMiddleware, adminController.getUsers);

// ====================
// ADMIN ORDERS
// ====================
router.get("/orders", adminMiddleware, adminController.getOrders);

module.exports = router;
