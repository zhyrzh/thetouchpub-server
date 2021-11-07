const { Pool } = require("pg");

module.exports = new Pool({
  database: process.env.DATABASE || "thetouchpub_db",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "sjcs2012AdminRhyz",
});
