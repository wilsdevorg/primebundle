const { User, Transaction } = require("../models");

class WalletService {
  static async getBalance(userId) {
    const user = await User.findByPk(userId);
    return user.walletBalance;
  }

  static async credit(userId, amount, description = "Credit") {
    const user = await User.findByPk(userId);

    user.walletBalance += amount;
    await user.save();

    await Transaction.create({
      UserId: user.id,
      type: "credit",
      amount,
      description,
      reference: "TXN-" + Date.now(),
      status: "successful",
      date: new Date().toISOString(),
    });

    return user.walletBalance;
  }

  static async debit(userId, amount, description = "Debit") {
    const user = await User.findByPk(userId);

    if (user.walletBalance < amount) {
      throw new Error("Insufficient balance");
    }

    user.walletBalance -= amount;
    await user.save();

    await Transaction.create({
      UserId: user.id,
      type: "debit",
      amount: -amount,
      description,
      reference: "TXN-" + Date.now(),
      status: "successful",
      date: new Date().toISOString(),
    });

    return user.walletBalance;
  }
}

module.exports = WalletService;
