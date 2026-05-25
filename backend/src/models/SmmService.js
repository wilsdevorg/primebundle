const { sequelize, Sequelize } = require('../config/database');

const SmmService = sequelize.define('SmmService', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceId: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    category: { type: Sequelize.STRING, allowNull: false },
    minOrder: { type: Sequelize.INTEGER, allowNull: false },
    maxOrder: { type: Sequelize.INTEGER, allowNull: false },
    pricePer1k: { type: Sequelize.FLOAT, allowNull: false },
    description: Sequelize.TEXT,
    deliveryTime: Sequelize.STRING,
});

module.exports = SmmService;