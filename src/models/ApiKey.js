const { sequelize, Sequelize } = require('../config/database');

const ApiKey = sequelize.define('ApiKey', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: { type: Sequelize.INTEGER, allowNull: false },
    key: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: Sequelize.STRING,
    isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
    lastUsed: Sequelize.STRING,
    requestCount: { type: Sequelize.INTEGER, defaultValue: 0 },
});

module.exports = ApiKey;