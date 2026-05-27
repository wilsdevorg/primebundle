const { sequelize, Sequelize } = require("../config/database");

const RefreshToken = sequelize.define("RefreshToken", {
  token: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  revoked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = RefreshToken;
