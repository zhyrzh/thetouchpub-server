const touchPubRouter = require("express").Router();
const articleRoutes = require("./article");
const articleDevelopmentRoutes = require("./article_development");

touchPubRouter.get("/", (req, res) => {
  res.send("<h1>Production API</h1>");
});

touchPubRouter.use("/api/article", articleRoutes);
touchPubRouter.use("/api/development/article", articleDevelopmentRoutes);

module.exports = touchPubRouter;
