const { sequelize, Sequelize } = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    txnId: { type: Sequelize.STRING, unique: true, allowNull: false },
    UserId: { type: Sequelize.INTEGER, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false }, // credit, debit
    reference: { type: Sequelize.STRING, allowNull: false },
    description: Sequelize.STRING,
    amount: { type: Sequelize.FLOAT, allowNull: false },
    status: { type: Sequelize.STRING, defaultValue: 'successful' },
    date: Sequelize.STRING,
});

module.exports = Transaction;