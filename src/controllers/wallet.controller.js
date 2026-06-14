const WalletService = require("../services/wallet.service");

// GET BALANCE
exports.getBalance = async (req, res, next) => {
  try {
    const balance = await WalletService.getBalance(req.user.id);

    return res.json({
      success: true,
      balance,
    });
  } catch (err) {
    next(err);
  }
};

// CREDIT WALLET
exports.credit = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const balance = await WalletService.credit(
      req.user.id,
      amount,
      "Manual Credit",
    );

    return res.json({
      success: true,
      balance,
    });
  } catch (err) {
    next(err);
  }
};

// OPTIONAL: DEBIT WALLET (recommended for completeness)
exports.debit = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const balance = await WalletService.debit(
      req.user.id,
      amount,
      "Manual Debit",
    );

    return res.json({
      success: true,
      balance,
    });
  } catch (err) {
    next(err);
  }
};
