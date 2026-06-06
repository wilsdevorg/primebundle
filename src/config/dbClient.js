const { Pool } = require("pg");

const pool = new Pool({
  host: "ep-blue-pine-aj195bs1.c-3.us-east-2.aws.neon.tech",
  user: "neondb_owner",
  password: "npg_RtkAUW3GLeI0",
  database: "neondb",
  port: 5432,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;
