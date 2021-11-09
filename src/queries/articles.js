require("dotenv").config();
const format = require("pg-format");
module.exports.insertArticleQry = (values) => {
  const table =
    process.env.NODE_ENV === "production" ? "articles" : "articles_development";
  const text = `INSERT INTO ${table} (title, body, author, date_published) VALUES ($1, $2, $3, $4) returning id`;
  return {
    text,
    values,
  };
};

module.exports.insertImagesQry = (values) => {
  const table =
    process.env.NODE_ENV === "production" ? "images" : "images_development";

  const sql = format(
    `INSERT INTO ${table} (article_id, image_url) VALUES %L RETURNING article_id`,
    values
  );
  return sql;
};
