const { User, Transaction, sequelize } = require("../models");

class WalletService {
  // =========================
  // CREDIT WALLET
  // =========================
  static async credit(
    userId,
    amount,
    description = "Credit",
    reference = null,
  ) {
    return await sequelize.transaction(async (t) => {
      const user = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw new Error("User not found");
      }

      user.walletBalance = Number(user.walletBalance) + Number(amount);

      await user.save({
        transaction: t,
      });

      await Transaction.create(
        {
          UserId: user.id,
          type: "credit",
          amount,
          description,
          reference:
            reference ||
            `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          status: "successful",
          date: new Date(),
        },
        {
          transaction: t,
        },
      );

      return user.walletBalance;
    });
  }

  // =========================
  // DEBIT WALLET
  // =========================
  static async debit(userId, amount, description = "Debit", reference = null) {
    return await sequelize.transaction(async (t) => {
      const user = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const currentBalance = Number(user.walletBalance);

      if (currentBalance < amount) {
        throw new Error("Insufficient balance");
      }

      user.walletBalance = currentBalance - Number(amount);

      await user.save({
        transaction: t,
      });

      await Transaction.create(
        {
          UserId: user.id,
          type: "debit",
          amount: -Math.abs(amount),
          description,
          reference:
            reference ||
            `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          status: "successful",
          date: new Date(),
        },
        {
          transaction: t,
        },
      );

      return user.walletBalance;
    });
  }

  // =========================
  // GET BALANCE
  // =========================
  static async getBalance(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user.walletBalance;
  }
}

module.exports = WalletService;
