const PaymentService = require("../services/payment.service");
const WalletService = require("../services/wallet.service");
const { User, Transaction } = require("../models");
const { v4: uuidv4 } = require("uuid");

// =========================
// INITIATE PAYMENT
// =========================
exports.initialize = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const user = req.user;

    const reference = "PSG-" + Date.now() + "-" + uuidv4().substring(0, 6);

    const data = await PaymentService.initializePayment({
      email: user.email,
      amount,
      reference,
    });

    res.json({
      success: true,
      data,
      reference,
    });
  } catch (err) {
    next(err);
  }
};

// =========================
// VERIFY PAYMENT (MANUAL)
// =========================
exports.verify = async (req, res, next) => {
  try {
    const { reference } = req.body;

    const data = await PaymentService.verifyPayment(reference);

    if (data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment not successful",
      });
    }

    const amount = data.amount / 100;

    const user = await User.findOne({
      where: { email: data.customer.email },
    });

    // Credit wallet via service
    await WalletService.credit(user.id, amount, "Paystack Top-up");

    await Transaction.create({
      UserId: user.id,
      type: "credit",
      amount,
      reference,
      description: "Paystack wallet top-up",
      status: "successful",
      date: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: "Wallet credited",
      amount,
    });
  } catch (err) {
    next(err);
  }
};
