require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
});

(async () => {
  try {
    console.log("CONNECTING...");
    await client.connect();
    console.log("CONNECTED");
    await client.end();
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
})();