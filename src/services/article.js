const cloudinary = require("../utils/cloudinary");
const pool = require("../db");

module.exports.addArticle = async (articleDetails) => {
  const { title, body, author, image } = articleDetails;

  const client = await pool.connect();
  try {
    const { secure_url } = await cloudinary.uploader.upload(image, {
      upload_preset: "a5y0qbbk",
    });

    await client.query("BEGIN");
    const { rows } = await client.query({
      text: "INSERT INTO articles (title, body, author, image_url) VALUES ($1, $2, $3, $4) returning *",
      values: [title, body, author, secure_url],
    });
    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.release();
  }
};

module.exports.getAllArticles = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id, title, body, author, CONCAT(to_char(date_published, 'Month'), to_char(date_published, 'DD'),', ',to_char(date_published, 'YYYY'),' ', to_char(date_published, 'HH'),':',to_char(date_published, 'MM'),':',to_char(date_published, 'SS')) AS date_published FROM articles"
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports.getSpecificArticle = async (articleId) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query({
      text: "SELECT id, title, body, author, CONCAT(to_char(date_published, 'Month'), to_char(date_published, 'DD'),', ',to_char(date_published, 'YYYY'),' ', to_char(date_published, 'HH'),':',to_char(date_published, 'MM'),':',to_char(date_published, 'SS')) AS date_published FROM articles WHERE id = $1",
      values: [articleId],
    });
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
