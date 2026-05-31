const { sequelize, Sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    phone: Sequelize.STRING,
    avatar: Sequelize.STRING,
    walletBalance: { type: Sequelize.FLOAT, defaultValue: 0 },
    loyaltyPoints: { type: Sequelize.INTEGER, defaultValue: 0 },
    totalOrders: { type: Sequelize.INTEGER, defaultValue: 0 },
    successfulOrders: { type: Sequelize.INTEGER, defaultValue: 0 },
    tier: { type: Sequelize.STRING, defaultValue: 'Bronze' },
    referralCode: { type: Sequelize.STRING, unique: true },
    referredBy: Sequelize.STRING,
    affiliateBalance: { type: Sequelize.FLOAT, defaultValue: 0 },
    totalReferrals: { type: Sequelize.INTEGER, defaultValue: 0 },
    totalEarned: { type: Sequelize.FLOAT, defaultValue: 0 },
    joinDate: Sequelize.STRING,
});

module.exports = User;