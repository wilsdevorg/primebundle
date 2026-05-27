const WalletService = require("../services/wallet.service");

exports.getBalance = async (req, res, next) => {
  try {
    const balance = await WalletService.getBalance(req.user.id);

    res.json({
      success: true,
      balance,
    });
  } catch (err) {
    next(err);
  }
};

exports.credit = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const balance = await WalletService.credit(
      req.user.id,
      amount,
      "Manual Credit",
    );

    res.json({
      success: true,
      balance,
    });
  } catch (err) {
    next(err);
  }
};
