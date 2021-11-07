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
