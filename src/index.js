const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const checkDB = require("./config/db-check");

// ====================
// ENV
// ====================
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

console.log("🌍 Environment:", env);

// ====================
// IMPORTS
// ====================
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const paymentRoutes = require("./routes/payment.routes");
const webhookRoutes = require("./routes/webhook.routes");
const errorHandler = require("./middleware/errorHandler");
const maintenanceCheck = require("./middleware/maintenanceCheck");
const plugbundleRoutes = require("./routes/plugbundle");
const { syncDB, sequelize } = require("./models");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

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
// SECURITY + MIDDLEWARE
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

// DEPLOYMENT TEST ROUTE
app.get("/primebundle-check", (req, res) => {
  res.json({
    success: true,
    message: "NEW DEPLOYMENT WORKING",
    version: "2026-06-14",
  });
});

// HEALTH CHECK ROUTE
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ====================
// ROUTES
// ====================
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/plugbundle", plugbundleRoutes);
app.use("/api", maintenanceCheck, routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====================
// 404 HANDLER
// ====================
app.use("*", (req, res) => {
  console.log("404:", req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    route: req.originalUrl,
    message: "Route not found",
  });
});

// ====================
// ERROR HANDLER
// ====================
app.use(errorHandler);

// ====================
// DB BOOTSTRAP
// ====================
const start = async () => {
  try {
    console.log("\n⏳ Connecting to database...");

    const timeout = setTimeout(() => {
      console.log("⚠️ DB connection still pending after 10s");
    }, 10000);

    await sequelize.authenticate();
    console.log("✅ Database connected");

    await syncDB();
    console.log("✅ Database synced");

    clearTimeout(timeout);

    app.listen(PORT, () => {
      console.log("\n=================================");
      console.log("🚀 SERVER STARTED");
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🏥 Health: /health`);
      console.log(`🧪 Test: /api/test`);
      console.log(`🔍 Deploy Check: /primebundle-check`);
      console.log(`🔐 Auth: /api/auth`);
      console.log(`💳 Payments: /api/payments`);
      console.log(`🌐 Webhooks: /api/webhooks`);
      console.log("=================================\n");
    });
  } catch (error) {
    console.error("❌ Server failed to start");
    console.error(error);
    process.exit(1);
  }
};

start();
