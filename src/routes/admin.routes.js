const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/admin.controller");

const { User, Order, Transaction } = require("../models");

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin management APIs
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */

// ==============================
// GET ALL USERS
// ADMIN ONLY
// ==============================
router.get("/users", adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */

// ==============================
// GET ALL ORDERS
// ADMIN ONLY
// ==============================
router.get("/orders", adminMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */

// ==============================
// GET ALL TRANSACTIONS
// ADMIN ONLY
// ==============================

router.get("/transactions", adminMiddleware, async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "phone", "role"],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    next(err);
  }
});
router.get("/stats", adminMiddleware, adminController.getStats);
module.exports = router;
