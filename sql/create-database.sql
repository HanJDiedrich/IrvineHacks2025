-- Create database
CREATE DATABASE IF NOT EXISTS connectionDb;
USE connectiondb;

-- Games table
-- Atributes: id, name, publicOrPrivate, rows, cols, numberOfPlays, dateCreated, creatorName, gameLink
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    public BOOLEAN NOT NULL,
    groupCount INT NOT NULL,
    wordsPerGroup INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    numberOfPlays INT DEFAULT 0,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creatorName VARCHAR(255) NOT NULL,
    gameLink VARCHAR(255) NOT NULL
);

-- Game data table, 
-- Attributes: gameId, data
CREATE TABLE IF NOT EXISTS game_data (
    gameId INT,
    data JSON NOT NULL,
    PRIMARY KEY (gameId),
    FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Categories table
-- Atributes: id, name
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Game categories table
-- Atributes: categoryId, gameId
CREATE TABLE IF NOT EXISTS game_categories (
    categoryId INT,
    gameId INT,
    PRIMARY KEY (categoryId, gameId),
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (gameId) REFERENCES games(id)
);
