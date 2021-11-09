\c postgres
DROP DATABASE thetouchpub_db;
CREATE DATABASE thetouchpub_db;

\c thetouchpub_db

-- DROP TABLE articles;
-- DROP TABLE images;

CREATE TABLE articles(
    id serial,
    title text,
    body text,
    author varchar(200),
    date_published timestamp default now(),
    PRIMARY KEY(id)
);

CREATE TABLE images(
    id serial,
    article_id int,
    image_url text,
    PRIMARY KEY(id),
    FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
);

SELECT a.id, a.title, a.body, a.author, CONCAT(to_char(a.date_published, 'Month'), to_char(a.date_published, 'DD'),', ',to_char(a.date_published, 'YYYY'),' ', to_char(a.date_published, 'HH'),':',to_char(a.date_published, 'MM'),':',to_char(a.date_published, 'SS')) AS date_published, i.image_url as image_url FROM articles a INNER JOIN images i ON a.id = i.article_id;