const OrderService = require("../services/order.service");

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getUserOrders(req.user.id);

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await OrderService.createOrder({
      ...req.body,
      UserId: req.user.id,
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
