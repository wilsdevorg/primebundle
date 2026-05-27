const { Order } = require("../models");

class OrderService {
  static async getUserOrders(userId) {
    return await Order.findAll({
      where: { UserId: userId },
      order: [["id", "DESC"]],
    });
  }

  static async createOrder(data) {
    return await Order.create({
      ...data,
      orderId: "ORD-" + Date.now(),
      date: new Date().toISOString(),
    });
  }
}

module.exports = OrderService;
