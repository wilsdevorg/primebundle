const { sequelize, Sequelize } = require('../config/database');

const AffiliateCommission = sequelize.define('AffiliateCommission', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: { type: Sequelize.INTEGER, allowNull: false },
    referredUserId: Sequelize.STRING,
    level: { type: Sequelize.INTEGER, defaultValue: 1 },
    amount: { type: Sequelize.FLOAT, allowNull: false },
    date: Sequelize.STRING,
});

module.exports = AffiliateCommission;