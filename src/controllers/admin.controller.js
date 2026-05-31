const AdminService = require("../services/admin.service");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await AdminService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await AdminService.getOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await AdminService.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
