const cloudinary = require("../utils/cloudinary");
const pool = require("../db");

const { promisify } = require("util");
const dayjs = require("dayjs");
const uploader = promisify(
  cloudinary.uploader.upload.bind(cloudinary.uploader)
);
const { insertArticleQry, insertImagesQry } = require("../queries/articles");

module.exports.addArticle = async (articleDetails) => {
  const { title, body, author, image } = articleDetails;
  const date_now = dayjs();
  const date_published = dayjs(date_now).format("MM-DD-YYYY HH:mm:ss");
  const uploadedImage = [];
  const client = await pool.connect();
  try {
    // DATABASE TRANSACTION
    await client.query("BEGIN");
    const { rows: insertedArticleDetails } = await client.query(
      insertArticleQry([title, body, author, date_published])
    );
    const articleId = insertedArticleDetails[0].id;

    for (let img of image) {
      const { secure_url } = await uploader(img, {
        upload_preset: "a5y0qbbk",
      });
      uploadedImage.push([+articleId, secure_url]);
    }

    await client.query(insertImagesQry(uploadedImage));
    await client.query("COMMIT");

    return insertedArticleDetails[0];
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
      "SELECT id, title, body, author, date_published FROM articles"
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
