const { sequelize, Sequelize } = require('../config/database');

const Admin = sequelize.define('Admin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.STRING, defaultValue: 'Super Admin' },
    avatar: Sequelize.STRING,
    lastLogin: Sequelize.STRING,
});

module.exports = Admin;