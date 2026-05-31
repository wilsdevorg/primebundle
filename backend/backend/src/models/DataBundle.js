const { sequelize, Sequelize } = require('../config/database');

const DataBundle = sequelize.define('DataBundle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bundleId: { type: Sequelize.STRING, unique: true, allowNull: false },
    network: { type: Sequelize.STRING, allowNull: false },
    data: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    points: { type: Sequelize.INTEGER, defaultValue: 0 },
    validity: Sequelize.STRING,
});

module.exports = DataBundle;