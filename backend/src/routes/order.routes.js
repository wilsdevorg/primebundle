const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/order.controller");

router.get("/", authMiddleware, orderController.getUserOrders);

module.exports = router;
