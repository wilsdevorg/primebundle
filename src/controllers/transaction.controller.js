const TransactionService = require("../services/transaction.service");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await TransactionService.getUserTransactions(
      req.user.id,
    );

    ```
res.json({
  success: true,
  count: transactions.length,
  data: transactions,
});
```;
  } catch (err) {
    next(err);
  }
};
