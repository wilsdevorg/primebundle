const express = require("express");
const router = express.Router();

// ====================
// ROUTE MODULES
// ====================
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const walletRoutes = require("./wallet.routes");
const orderRoutes = require("./order.routes");
const paymentRoutes = require("./payment.routes");
const webhookRoutes = require("./webhook.routes");

// ====================
// HEALTH CHECK (GLOBAL)
// ====================
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "PrimeBundle API running (clean architecture)",
    timestamp: new Date().toISOString(),
  });
});

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API test working",
  });
});

// ====================
// ROUTE REGISTRATION
// ====================
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/wallet", walletRoutes);
router.use("/orders", orderRoutes);

// 🔥 NEW ADDITIONS (PAYMENT SYSTEM)
router.use("/payments", paymentRoutes);
router.use("/webhooks", webhookRoutes);

// ====================
// 404 HANDLER (IMPROVED)
// ====================
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ====================
// GLOBAL ERROR HANDLER
// ====================
router.use((err, req, res, next) => {
  console.error("API Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = router;
