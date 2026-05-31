const crypto = require("crypto");
const PaymentService = require("../services/payment.service");
const WalletService = require("../services/wallet.service");
const { User, Transaction } = require("../models");

// =========================
// VERIFY PAYSTACK SIGNATURE
// =========================
const verifySignature = (req) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const hash = crypto
    .createHmac("sha512", secret)
    .update(req.rawBody || JSON.stringify(req.body))
    .digest("hex");

  return hash === req.headers["x-paystack-signature"];
};

exports.paystackWebhook = async (req, res) => {
  try {
    // =========================
    // ALWAYS ACK FAST
    // =========================
    res.sendStatus(200);

    // =========================
    // SECURITY CHECK (CRITICAL)
    // =========================
    if (!verifySignature(req)) {
      console.error("❌ Invalid Paystack webhook signature");
      return;
    }

    const event = req.body;

    // =========================
    // ONLY PROCESS SUCCESSFUL CHARGES
    // =========================
    if (event.event !== "charge.success") return;

    const reference = event.data.reference;
    const amount = event.data.amount / 100;

    // =========================
    // IDENTITY RESOLUTION (SAFE)
    // =========================
    const email = event.data.customer?.email;

    if (!email) {
      console.error("Webhook missing customer email");
      return;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error("User not found for webhook email:", email);
      return;
    }

    // =========================
    // IDEMPOTENCY CHECK (NO DOUBLE CREDIT)
    // =========================
    const existingTxn = await Transaction.findOne({
      where: { reference },
    });

    if (existingTxn) {
      console.log("Duplicate webhook ignored:", reference);
      return;
    }

    // =========================
    // CREDIT WALLET
    // =========================
    await WalletService.credit(user.id, amount, "Paystack Webhook Top-up");

    // =========================
    // LOG TRANSACTION
    // =========================
    await Transaction.create({
      UserId: user.id,
      type: "credit",
      amount,
      reference,
      description: "Paystack webhook payment",
      status: "successful",
      date: new Date().toISOString(),
    });

    console.log("✅ Webhook processed:", reference);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
  }
};
