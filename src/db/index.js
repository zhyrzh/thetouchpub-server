const { Pool } = require("pg");
const config =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        database: "thetouchpub_db",
        user: "postgres",
        password: "sjcs2012AdminRhyz",
        port: 5432,
        host: "localhost",
      };
module.exports = new Pool(config);
