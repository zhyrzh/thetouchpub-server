const touchPubRouter = require("express").Router();
const articleRoutes = require("./article");

touchPubRouter.get("/", (req, res) => {
  res.send("<h1>Production API</h1>");
});
touchPubRouter.use("/api/article", articleRoutes);

module.exports = touchPubRouter;
