const articleRoutes = require("express").Router();

const {
  addArticle,
  getAllArticles,
  getSpecificArticle,
} = require("../services/article");

// RETRIEVE all articles
articleRoutes.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    if (articles.length <= 0)
      return res
        .status(404)
        .json({ success: true, message: "no articles found" });
    res.status(200).json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: error, message: "server error" });
  }
});

// RETRIEVE a specific article
articleRoutes.get("/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const article = await getSpecificArticle(articleId);
    res.status(200).json(article);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: error, message: "server error" });
  }
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
