const express = require("express");

const router = express.Router();

// ==============================
// ROUTE IMPORTS
// ==============================
const authRoutes = require("./auth.routes");

const userRoutes = require("./user.routes");

const adminRoutes = require("./admin.routes");

const walletRoutes = require("./wallet.routes");

const orderRoutes = require("./order.routes");

// ==============================
// HEALTH ROUTES
// ==============================
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "PrimeBundle API running",
    timestamp: new Date().toISOString(),
  });
});

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API test working",
  });
});

// ==============================
// REGISTER ROUTES
// ==============================
router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/admin", adminRoutes);

router.use("/wallet", walletRoutes);

router.use("/orders", orderRoutes);

// ==============================
// SAFE ERROR HANDLER
// ==============================
router.use((err, req, res, next) => {
  console.error("Route Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = router;
