--Creating a new user
-- CREATE USER 'gameUser'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON *.* TO 'gameUser'@'localhost';
-- FLUSH PRIVILEGES;
-- How to login: mysql -u gameUser -p

-- Creating categories
INSERT INTO game_categories (categoryId, gameId)
VALUES ('Math'), ('Programming'); 

--Creating a new game
INSERT INTO games (name, public, rowX, colY, creatorName, gameLink) 
VALUES ('Game1', TRUE, 4, 4, 'HanSolo', 'game1-link');
SET @gameId = LAST_INSERT_ID();
-- Inserting game data
INSERT INTO game_data (gameId, data) 
VALUES (@gameId, '{"row1": ["a", "b", "c", "d"], "row2": ["e", "f", "g", "h"], "row2": ["e", "f", "g", "h"], "row3": ["i", "j", "k", "l"], "row4": ["m", "n", "o", "p"]}');
VALUES (2, @gameId); -- 2 is programming category

--Creating a new game
INSERT INTO games (name, public, rowX, colY, creatorName, gameLink) 
VALUES ('Game2', TRUE, 4, 4, 'Chewbacca', 'game2-link');
SET @gameId = LAST_INSERT_ID();
-- Inserting game data
INSERT INTO game_data (gameId, data) 
VALUES (@gameId, '{"row1": ["a", "b", "c", "d"], "row2": ["e", "f", "g", "h"], "row2": ["e", "f", "g", "h"], "row3": ["i", "j", "k", "l"], "row4": ["m", "n", "o", "p"]}');
VALUES (1, @gameId); -- 2 is programming category