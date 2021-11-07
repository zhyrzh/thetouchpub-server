const touchPubRouter = require("express").Router();
const articleRoutes = require("./article");

touchPubRouter.use("/api/article", articleRoutes);

module.exports = touchPubRouter;
