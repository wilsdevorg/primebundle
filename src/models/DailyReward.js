const { sequelize, Sequelize } = require('../config/database');

const DailyReward = sequelize.define('DailyReward', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: { type: Sequelize.INTEGER, allowNull: false },
    day: { type: Sequelize.INTEGER, allowNull: false },
    points: { type: Sequelize.INTEGER, allowNull: false },
    claimed: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = DailyReward;