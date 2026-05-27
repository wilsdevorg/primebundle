const { sequelize, Sequelize } = require('../config/database');

const ResellerSetting = sequelize.define('ResellerSetting', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    storeName: Sequelize.STRING,
    storeDescription: Sequelize.TEXT,
    storeLogo: Sequelize.STRING,
    markup: { type: Sequelize.FLOAT, defaultValue: 10 },
    isActive: { type: Sequelize.BOOLEAN, defaultValue: false },
    customDomain: Sequelize.STRING,
    theme: { type: Sequelize.STRING, defaultValue: 'default' },
});

module.exports = ResellerSetting;