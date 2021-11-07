const articleRoutes = require("express").Router();

const { addArticle } = require("../services/article");

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
articleRoutes.post("/", async (req, res) => {
  const { title, body, author, image } = req.body;

  if (!title || !body || !author || !image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all required fields" });
  }

  try {
    const addArticleRes = await addArticle(req.body);
    if (!addArticleRes)
      return res
        .status(400)
        .json({ success: false, message: "article upload failed" });
    res.status(201).json({ success: true, data: addArticleRes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "server error!" });
  }
});

// UPDATE an article
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

module.exports = articleRoutes;
