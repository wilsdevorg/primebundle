const { Transaction } = require("../models");

class TransactionService {
  static async getUserTransactions(userId) {
    return await Transaction.findAll({
      where: {
        UserId: userId,
      },
      order: [["id", "DESC"]],
    });
  }
}

module.exports = TransactionService;
