const cloudinary = require("../utils/cloudinary");
const pool = require("../db");
const format = require("pg-format");
const { promisify } = require("util");

const uploader = promisify(
  cloudinary.uploader.upload.bind(cloudinary.uploader)
);

module.exports.addArticle = async (articleDetails) => {
  const { title, body, author, image } = articleDetails;
  const uploadedImage = [];
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query({
      text: "INSERT INTO articles (title, body, author) VALUES ($1, $2, $3) returning id",
      values: [title, body, author],
    });
    const articleId = rows[0].id;

    for (let img of image) {
      console.log(img);
      const { secure_url } = await uploader(img, {
        upload_preset: "a5y0qbbk",
      });
      uploadedImage.push([+articleId, secure_url]);
    }
    console.log(uploadedImage, "uploaded image");
    const sql = format(
      "INSERT INTO images (article_id, image_url) VALUES %L",
      uploadedImage
    );

    console.log(sql, "sql");
    const res = await client.query(sql);
    console.log(res);
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
    const { rows: articleRows } = await client.query(
      "SELECT id, title, body, author, CONCAT(to_char(date_published, 'Month'), to_char(date_published, 'DD'),', ',to_char(date_published, 'YYYY'),' ', to_char(date_published, 'HH'),':',to_char(date_published, 'MM'),':',to_char(date_published, 'SS')) AS date_published FROM articles"
    );

    const { rows: imageRows } = await client.query("SELECT * FROM images");

    const articles = articleRows.map((row) => {
      const articleImage = imageRows.filter(
        (imageRow) => imageRow.article_id === row.id
      );
      return {
        ...row,
        images: articleImage,
      };
    });
    return articles;
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

cloudinary.uploader.multi;
