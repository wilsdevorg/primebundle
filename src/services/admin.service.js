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
    const { User, Order, Transaction } = require("../models");

    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalTransactions = await Transaction.count();

    const revenueResult = await Transaction.sum("amount", {
      where: { status: "successful" },
    });

    const walletResult = await User.sum("walletBalance");

    return {
      totalUsers,
      totalOrders,
      totalTransactions,
      totalRevenue: revenueResult || 0,
      totalWalletBalance: walletResult || 0,
    };
  }
}

module.exports = AdminService;
