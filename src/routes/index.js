const touchPubRouter = require("express").Router();
const articleRoutes = require("./article");

touchPubRouter.use(articleRoutes);

module.exports = touchPubRouter;
