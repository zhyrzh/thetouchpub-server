const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("../db");
const session_secret = process.env.SESSION_SECRET;

module.exports = session({
  name: "thetouchpub",
  store: new PgSession({
    pool,
    tableName: "thetouchpub_session",
    createTableIfMissing: true,
    pruneSessionInterval: 1,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  },
  secret: session_secret,
  resave: true,
  saveUninitialized: false,
});
