const touchPubRouter = require("express").Router();
const articleRoutes = require("./article");
const articleDevelopmentRoutes = require("./article_development");
const authDevelopmentRoutes = require("./auth_development");
const authRoutes = require("./auth");

touchPubRouter.get("/", (req, res) => {
  res.send("<h1>Production API</h1>");
});

touchPubRouter.use("/api/development/article", articleDevelopmentRoutes);
touchPubRouter.use("/api/article", articleRoutes);
touchPubRouter.use("/api/development/auth", authDevelopmentRoutes);
touchPubRouter.use("/api/auth", authRoutes);

module.exports = touchPubRouter;
