DROP DATABASE thetouchpub_db;
CREATE DATABASE thetouchpub_db;

\c thetouchpub_db

CREATE TABLE articles(
    article_id serial,
    title text,
    body text,
    author varchar(200),
    date_published timestamp default now(),
    image_url text,
    PRIMARY KEY(article_id)
);

