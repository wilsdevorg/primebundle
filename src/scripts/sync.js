const { sequelize } = require("../models");

const run = async () => {
  try {
    console.log("Syncing database...");

    await sequelize.sync({ alter: true });

    console.log("Database synced successfully");

    process.exit();
  } catch (err) {
    console.error("Sync failed:", err);
    process.exit(1);
  }
};

run();
