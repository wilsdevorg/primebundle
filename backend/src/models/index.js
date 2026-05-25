const { sequelize, Sequelize } = require('../config/database');

// Import models
const User = require('./User');
const DataBundle = require('./DataBundle');
const SmmService = require('./SmmService');
const Order = require('./Order');
const Transaction = require('./Transaction');
const LoyaltyHistory = require('./LoyaltyHistory');
const DailyReward = require('./DailyReward');
const AffiliateCommission = require('./AffiliateCommission');
const ResellerSetting = require('./ResellerSetting');
const ApiKey = require('./ApiKey');
const Admin = require('./Admin');
const SystemSetting = require('./SystemSetting');

// Sync all models
const syncDB = async (options = {}) => {
    await sequelize.sync(options);
};

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
    syncDB,
};