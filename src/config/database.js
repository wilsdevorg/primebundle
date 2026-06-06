require("dotenv").config();

const { Sequelize } = require("sequelize");
const path = require("path");

const USE_SQLITE = process.env.USE_SQLITE === "true";

let sequelize;

if (USE_SQLITE || !process.env.DATABASE_URL) {
  console.log("📦 Using SQLite database (local)");
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../data/store.sqlite"),
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  console.log("🐘 Using PostgreSQL database (remote)");
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 15000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

module.exports = {
  sequelize,
  Sequelize,
};
