const { sequelize, Sequelize } = require('../config/database');

const LoyaltyHistory = sequelize.define('LoyaltyHistory', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: { type: Sequelize.INTEGER, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false }, // earn, redeem, bonus
    points: { type: Sequelize.INTEGER, allowNull: false },
    description: Sequelize.STRING,
    date: Sequelize.STRING,
});

module.exports = LoyaltyHistory;