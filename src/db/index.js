const { Pool } = require("pg");
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
module.exports = new Pool(config);
