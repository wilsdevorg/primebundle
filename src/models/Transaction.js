const { sequelize, Sequelize } = require("../config/database");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    txnId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    type: {
      type: Sequelize.ENUM("credit", "debit"),
      allowNull: false,
    },

    reference: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    amount: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: true,
      },
    },

    status: {
      type: Sequelize.ENUM("pending", "successful", "failed", "reversed"),
      defaultValue: "successful",
    },

    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    indexes: [
      {
        fields: ["UserId"],
      },
      {
        fields: ["reference"],
        unique: true,
      },
      {
        fields: ["txnId"],
        unique: true,
      },
      {
        fields: ["status"],
      },
      {
        fields: ["date"],
      },
    ],
  },
);

module.exports = Transaction;
