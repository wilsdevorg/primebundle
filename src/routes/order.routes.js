const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const orderController = require(
  require("path").resolve(__dirname, "../controllers/order.controller"),
);

// HARD GUARD (prevents silent undefined crashes)
if (typeof authMiddleware !== "function") {
  throw new Error("authMiddleware is not a function");
}

if (!orderController || typeof orderController.getUserOrders !== "function") {
  throw new Error("orderController.getUserOrders is not a function");
}

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management APIs
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get user orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, (req, res, next) =>
  orderController.getUserOrders(req, res, next),
);

module.exports = router;
