const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhook.controller");

// Paystack webhook endpoint (NO AUTH MIDDLEWARE)
router.post("/paystack", webhookController.paystackWebhook);

module.exports = router;
