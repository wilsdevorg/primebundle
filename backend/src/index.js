const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const { syncDB } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
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

const maintenanceCheck = require("./middleware/maintenanceCheck");

// Routes
app.use("/api", maintenanceCheck, routes);

// Error handler
app.use(errorHandler);

// Start server
const start = async () => {
  try {
    await syncDB();
    console.log("📦 Database synced");
    app.listen(PORT, () => {
      console.log(`\n🚀 PrimeBundle API running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

start();
