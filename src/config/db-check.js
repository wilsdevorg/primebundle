const { sequelize } = require("./database");

async function checkDB() {
  try {
    console.log("⏳ Testing DB connection...");
    await sequelize.authenticate({ timeout: 15000 });
    console.log("✅ DB OK");
  } catch (err) {
    console.error("❌ DB FAIL:", err.message);
    throw err;
  }
}

module.exports = { checkDB };
