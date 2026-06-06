const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const walletController = require("../controllers/wallet.controller");

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet management APIs
 */

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Get current user's wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/balance", authMiddleware, walletController.getBalance);

module.exports = router;
