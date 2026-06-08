const { sequelize, Sequelize } = require("../config/database");

const Order = sequelize.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: { type: Sequelize.STRING, unique: true, allowNull: false },
  UserId: { type: Sequelize.INTEGER, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false }, // 'Data' or 'SMM'
  network: Sequelize.STRING,
  recipient: Sequelize.STRING,
  amount: { type: Sequelize.FLOAT, allowNull: false },
  dataAmount: Sequelize.STRING,
  status: { type: Sequelize.STRING, defaultValue: "processing" }, // processing, successful, failed
  points: { type: Sequelize.INTEGER, defaultValue: 0 },
  date: Sequelize.STRING,
});

module.exports = Order;
