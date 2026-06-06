const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing APIs
 */

/**
 * @swagger
 * /payments/initialize:
 *   post:
 *     summary: Initialize a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// =========================
// INIT PAYMENT
// =========================
router.post("/initialize", authMiddleware, paymentController.initialize);

/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// =========================
// VERIFY PAYMENT
// =========================
router.post("/verify", authMiddleware, paymentController.verify);

module.exports = router;
