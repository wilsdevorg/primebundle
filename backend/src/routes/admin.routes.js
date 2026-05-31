const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

const { User, Order, Transaction } = require("../models");

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

// ==============================
// GET ALL TRANSACTIONS
// ADMIN ONLY
// ==============================
router.get("/transactions", adminMiddleware, async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
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

module.exports = router;
