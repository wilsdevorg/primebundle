const { User, Order } = require("../models");

class AdminService {
  static async getUsers() {
    return await User.findAll();
  }

  static async getOrders() {
    return await Order.findAll({
      order: [["id", "DESC"]],
    });
  }

  static async getStats() {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();

    return {
      totalUsers,
      totalOrders,
    };
  }
}

module.exports = AdminService;
