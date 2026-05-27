require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 15000,
});

async function testConnection() {
  try {
    console.log("⏳ Connecting to Neon...");

    await client.connect();

    console.log("✅ Connected successfully");

    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);

    await client.end();

    console.log("✅ Done");
  } catch (err) {
    console.error("❌ Failed");
    console.error(err);
  }
}

testConnection();
