const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

// ====================
// ENV
// ====================
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

// ====================
// IMPORTS
// ====================
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const paymentRoutes = require("./routes/payment.routes");
const webhookRoutes = require("./routes/webhook.routes");

const errorHandler = require("./middleware/errorHandler");
const maintenanceCheck = require("./middleware/maintenanceCheck");
const { syncDB, sequelize } = require("./models");

// ====================
// APP INIT
// ====================
const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// RAW BODY (FOR WEBHOOKS)
// ====================
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

// ====================
// SECURITY + BASIC MIDDLEWARE
// ====================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// ====================
// RATE LIMITING
// ====================
app.use(
  rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    message: {
      success: false,
      message: "Too many requests, please try again later.",
    },
  }),
);

// ====================
// BASIC ROUTES
// ====================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API test route working",
  });
});

// ====================
// ROUTE REGISTRATION (IMPORTANT FIX)
// ====================
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/webhooks", webhookRoutes);

app.use("/api", maintenanceCheck, routes);

// ====================
// ERROR HANDLER
// ====================
app.use(errorHandler);

// ====================
// START SERVER
// ====================
const start = async () => {
  try {
    console.log("\n⏳ Connecting to database...");

    await sequelize.authenticate();
    console.log("✅ Database connected");

    await syncDB();
    console.log("✅ Database synced");

    app.listen(PORT, () => {
      console.log("\n🚀 Server running");
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📡 Base URL: http://localhost:${PORT}`);
      console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
      console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
      console.log(`💳 Payments: http://localhost:${PORT}/api/payments`);
      console.log(`🌐 Webhooks: http://localhost:${PORT}/api/webhooks`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Server failed to start");
    console.error(error);
    process.exit(1);
  }
};

start();
