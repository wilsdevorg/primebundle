const { sequelize, Sequelize } = require("../config/database");

// =====================
// IMPORT MODELS
// =====================
const User = require("./User");
const DataBundle = require("./DataBundle");
const SmmService = require("./SmmService");
const Order = require("./Order");
const Transaction = require("./Transaction");
const LoyaltyHistory = require("./LoyaltyHistory");
const DailyReward = require("./DailyReward");
const AffiliateCommission = require("./AffiliateCommission");
const ResellerSetting = require("./ResellerSetting");
const ApiKey = require("./ApiKey");
const Admin = require("./Admin");
const SystemSetting = require("./SystemSetting");
const RefreshToken = require("./RefreshToken");

// =====================
// ASSOCIATIONS
// =====================
User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

// =====================
// DB SYNC (NEON SAFE)
// =====================
const syncDB = async (options = {}) => {
  try {
    console.log("⏳ Checking database connection...");

    // 🔥 HARD FAIL FAST (prevents silent hangs)
    await sequelize.authenticate({
      timeout: 10000,
    });

    console.log("✅ DB authentication successful");

    // 🔥 SAFE SYNC MODE
    await sequelize.sync({
      alter: false,
      logging: false,
      ...options,
    });

    console.log("✅ DB sync completed");
  } catch (error) {
    console.error("❌ DB sync failed:", error.message);

    // 🔥 IMPORTANT: crash early instead of hanging app
    throw error;
  }
};

// =====================
// EXPORTS
// =====================
module.exports = {
  sequelize,
  Sequelize,
  User,
  DataBundle,
  SmmService,
  Order,
  Transaction,
  LoyaltyHistory,
  DailyReward,
  AffiliateCommission,
  ResellerSetting,
  ApiKey,
  Admin,
  SystemSetting,
  RefreshToken,
  syncDB,
};
