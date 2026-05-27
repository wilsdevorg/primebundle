const { User, Order } = require("../models");

// DASHBOARD USERS
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// DASHBOARD ORDERS
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};
