const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

// ====================
// Load Environment Variables
// ====================

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

// ====================
// Imports
// ====================

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const maintenanceCheck = require("./middleware/maintenanceCheck");

const { syncDB, sequelize } = require("./models");

// ====================
// App Initialization
// ====================

const app = express();

const PORT = process.env.PORT || 5000;

// ====================
// Security Middleware
// ====================

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  }),
);

// ====================
// General Middleware
// ====================

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ====================
// Rate Limiting
// ====================

app.use(
  "/api/",
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
// Routes
// ====================

app.use("/api", maintenanceCheck, routes);

// ====================
// Error Handler
// ====================

app.use(errorHandler);

// ====================
// Start Server
// ====================

const start = async () => {
  try {
    console.log("");
    console.log("⏳ Connecting to Neon database...");

    await sequelize.authenticate();

    console.log("✅ Database connection successful");

    console.log("⏳ Syncing Sequelize models...");

    await syncDB();

    console.log("✅ Database synced successfully");

    app.listen(PORT, () => {
      console.log("");
      console.log(`🚀 PrimeBundle API running on port ${PORT}`);

      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);

      console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);

      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error("❌ Failed to start backend");
    console.error(error);
    console.error("");

    process.exit(1);
  }
};

// ====================
// Initialize Application
// ====================

start();
