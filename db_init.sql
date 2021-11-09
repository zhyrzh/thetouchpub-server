-- \c postgres
-- DROP DATABASE thetouchpub_db;
-- CREATE DATABASE thetouchpub_db;

-- \c thetouchpub_db

DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE images;

CREATE TABLE articles(
    id serial,
    title text,
    body text,
    author varchar(200),
    date_published timestamp,
    PRIMARY KEY(id)
);

CREATE TABLE images(
    id serial,
    article_id int,
    image_url text,
    PRIMARY KEY(id),
    FOREIGN KEY(article_id) 
        REFERENCES articles(id) 
        ON DELETE CASCADE
);

CREATE TABLE articles_development(
    id serial,
    title text,
    body text,
    author varchar(200),
    date_published timestamp,
    PRIMARY KEY(id)
);

CREATE TABLE images_development(
    id serial,
    article_id int,
    image_url text,
    PRIMARY KEY(id),
    FOREIGN KEY(article_id) 
        REFERENCES articles(id) 
        ON DELETE CASCADE
);
-- SELECT id, title, body, author, CONCAT(
--     EXTRACT(SECOND FROM date_published)
-- ) AS date_published 
-- FROM articles;
-- -- CREATE TABLE test_date(
-- --     date_published date default now(),
-- --     name varchar(100)
-- -- );