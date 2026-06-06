const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhook.controller");

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: External service webhook endpoints
 */

/**
 * @swagger
 * /webhooks/paystack:
 *   post:
 *     summary: Paystack webhook callback
 *     description: Receives payment event notifications from Paystack.
 *     tags: [Webhooks]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook payload
 *       500:
 *         description: Internal server error
 */

// Paystack webhook endpoint (NO AUTH MIDDLEWARE)
router.post("/paystack", webhookController.paystackWebhook);

module.exports = router;
