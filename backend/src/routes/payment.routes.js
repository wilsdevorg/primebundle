const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");

// =========================
// INIT PAYMENT
// =========================
router.post("/initialize", authMiddleware, paymentController.initialize);

// =========================
// VERIFY PAYMENT
// =========================
router.post("/verify", authMiddleware, paymentController.verify);

module.exports = router;
