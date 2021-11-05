const articleRoutes = require("express").Router();

// RETRIEVE all articles
articleRoutes.get("/", (req, res) => {
  try {
  } catch (error) {}
});

// RETRIEVE a specific article
articleRoutes.get("/:article_id", (req, res) => {
  const article_id = req.params.article_id;
  try {
  } catch (error) {}
});

// ADD or POST an article
articleRoutes.post("/", (req, res) => {
  try {
  } catch (error) {}
});

// UPDATES an article
articleRoutes.get("/:article_id", (req, res) => {
  const article_id = req.params.article_id;
  try {
  } catch (error) {}
});

// DELETE an article
articleRoutes.get("/:article_id", (req, res) => {
  const article_id = req.params.article_id;
  try {
  } catch (error) {}
});
