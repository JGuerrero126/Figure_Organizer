DROP DATABASE IF EXISTS figure_db;

CREATE DATABASE figure_db;

USE figure_db;

CREATE TABLE figures (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30),
  type VARCHAR(50),
  price INT,
  series VARCHAR(50),
  inStorage BOOLEAN
);

