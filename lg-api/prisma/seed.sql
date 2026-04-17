-- User and authentication
INSERT INTO "user" (id, username, developer, email, is_verified) VALUES (1, 'Lomaz', true, 'ianlomas0@gmail.com', true);
INSERT INTO passwords (id, user_id, password_hash) VALUES (gen_random_uuid(), 1, '$2b$10$/TBEy1oTQNiekrTZ2csbEe42eO9xYxK3jRuT1z18rgerbvljHpQPa');

-- Tags
INSERT INTO tag (id, name) VALUES (1, 'Short');
INSERT INTO tag (id, name) VALUES (2, 'Single Player');
INSERT INTO tag (id, name) VALUES (3, 'Mouse Only');
INSERT INTO tag (id, name) VALUES (4, '2D');
INSERT INTO tag (id, name) VALUES (5, '3D');
INSERT INTO tag (id, name) VALUES (6, 'Incremental');
INSERT INTO tag (id, name) VALUES (7, 'Keyboard Only');
INSERT INTO tag (id, name) VALUES (8, 'Offline Multiplayer');
INSERT INTO tag (id, name) VALUES (9, 'Relaxing');
INSERT INTO tag (id, name) VALUES (10, 'High Scores');
INSERT INTO tag (id, name) VALUES (11, 'MMO');
INSERT INTO tag (id, name) VALUES (12, 'SciFi');
INSERT INTO tag (id, name) VALUES (13, 'Retro');

-- Genres
INSERT INTO genre (id, name) VALUES (1, 'Arcade');
INSERT INTO genre (id, name) VALUES (2, 'Action');
INSERT INTO genre (id, name) VALUES (3, 'Idle');
INSERT INTO genre (id, name) VALUES (4, 'Puzzle');
INSERT INTO genre (id, name) VALUES (5, 'Clicker');

-- Games
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (1, 'ceres', 'https://gitlomaz.github.io/ceres/', 1128, 615, 1, 3);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (2, 'corruption2', 'https://gitlomaz.github.io/corruption2/', 700, 590, 1, 4);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (3, 'plinko', 'https://gitlomaz.github.io/plinko/', 1108, 595, 1, 3);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (4, 'snowball', 'https://gitlomaz.github.io/snowball/', 800, 600, 1, 2);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (5, 'infinitybreak', 'https://gitlomaz.github.io/infinitybreak/', 1280, 720, 1, 2);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (6, 'nightscapes', 'https://gitlomaz.github.io/nightscapesio/', 1180, 720, 1, 2);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (7, 'spaced', 'https://gitlomaz.github.io/spaced/', 1108, 595, 1, 4);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (8, 'slashArena', 'https://gitlomaz.github.io/slash/', 1280, 720, 1, 2);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (9, 'stacked', 'https://gitlomaz.github.io/stacked/', 1128, 615, 1, 5);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (10, 'darkNebula', 'https://gitlomaz.github.io/asteroids/', 1288, 728, 1, 1);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id) VALUES (11, 'quantumBreaker', 'https://gitlomaz.github.io/jammin/', 1280, 720, 1, 1);
INSERT INTO game (id, game_string, iframe, width, height, author_id, genre_id, disabled) VALUES (12, 'kalrul', 'https://gitlomaz.github.io/applesauce-frontend/', 1060, 750, 1, 2, true);

-- Game to tag mappings
INSERT INTO "_gameTotag" ("A", "B") VALUES (1, 2);
INSERT INTO "_gameTotag" ("A", "B") VALUES (1, 3);
INSERT INTO "_gameTotag" ("A", "B") VALUES (1, 6);
INSERT INTO "_gameTotag" ("A", "B") VALUES (1, 9);
INSERT INTO "_gameTotag" ("A", "B") VALUES (2, 3);
INSERT INTO "_gameTotag" ("A", "B") VALUES (2, 8);
INSERT INTO "_gameTotag" ("A", "B") VALUES (3, 3);
INSERT INTO "_gameTotag" ("A", "B") VALUES (3, 9);
INSERT INTO "_gameTotag" ("A", "B") VALUES (3, 2);
INSERT INTO "_gameTotag" ("A", "B") VALUES (4, 1);
INSERT INTO "_gameTotag" ("A", "B") VALUES (4, 10);
INSERT INTO "_gameTotag" ("A", "B") VALUES (4, 4);
INSERT INTO "_gameTotag" ("A", "B") VALUES (5, 13);
INSERT INTO "_gameTotag" ("A", "B") VALUES (5, 12);
INSERT INTO "_gameTotag" ("A", "B") VALUES (5, 10);
INSERT INTO "_gameTotag" ("A", "B") VALUES (6, 11);
INSERT INTO "_gameTotag" ("A", "B") VALUES (6, 4);
INSERT INTO "_gameTotag" ("A", "B") VALUES (7, 2);
INSERT INTO "_gameTotag" ("A", "B") VALUES (7, 1);
INSERT INTO "_gameTotag" ("A", "B") VALUES (7, 12);
INSERT INTO "_gameTotag" ("A", "B") VALUES (8, 1);
INSERT INTO "_gameTotag" ("A", "B") VALUES (8, 10);
INSERT INTO "_gameTotag" ("A", "B") VALUES (9, 12);
INSERT INTO "_gameTotag" ("A", "B") VALUES (9, 6);
INSERT INTO "_gameTotag" ("A", "B") VALUES (10, 1);
INSERT INTO "_gameTotag" ("A", "B") VALUES (10, 2);
INSERT INTO "_gameTotag" ("A", "B") VALUES (10, 9);
INSERT INTO "_gameTotag" ("A", "B") VALUES (10, 13);
INSERT INTO "_gameTotag" ("A", "B") VALUES (11, 2);
INSERT INTO "_gameTotag" ("A", "B") VALUES (11, 10);
INSERT INTO "_gameTotag" ("A", "B") VALUES (11, 13);
INSERT INTO "_gameTotag" ("A", "B") VALUES (12, 4);
INSERT INTO "_gameTotag" ("A", "B") VALUES (12, 11);

-- Game ratings
INSERT INTO game_rating (game_id, user_id, value) VALUES (1, 1, 3);
INSERT INTO game_rating (game_id, user_id, value) VALUES (2, 1, 5);

-- Game favorites
INSERT INTO game_favorite (game_id, user_id) VALUES (1, 1);
INSERT INTO game_favorite (game_id, user_id) VALUES (2, 1);

-- Game translations
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (1, 'en', 'Harvest Horizons', 'A farming game like no other!', 'Plant crops, harvest, click around!');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (2, 'en', 'Corruption II', 'A back and forth battle of will', 'Click on a node to rotate, take over the world');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (3, 'en', 'Idle Plinko', 'plinkoooooo', 'click balls, spend upgrades');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (4, 'en', 'Snowball', 'A major snowfight', 'See instructions ingame');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (5, 'en', 'Infinity Break', 'An epic space shooter', 'space to shoot, M for missiles?');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (6, 'en', 'Nightscapes', 'A mysterious MMO', 'Click to explore, instructions ingame');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (7, 'en', 'Spaced II', 'A puzzle out of this world', 'WASD to move');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (8, 'en', 'Slash Arena', 'An action packed melee battle', 'WASD to move, mouse to aim and attack');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (9, 'en', 'Stacked Idle', 'Build those bricks!', 'Click things');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (10, 'en', 'Dark Nebula', 'Asteroids... but with more!', 'WASD to move, space to shoot');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (11, 'en', 'Quantum Breaker', 'Bust those bricks!', 'A/D to move, space to shoot');
INSERT INTO game_translation (game_id, language, name, description, instructions) VALUES (12, 'en', 'Rise of the Kal-Rul', 'An absolutely awful RPG game', 'Click things, WASD to move');

-- Achievements
INSERT INTO achievement (id, game_id, difficulty, icon_path) VALUES (1, 1, 'easy', 'ico');
INSERT INTO achievement (id, game_id, difficulty, icon_path) VALUES (2, 1, 'medium', 'ico');
INSERT INTO achievement (id, game_id, difficulty, icon_path) VALUES (3, 1, 'hard', 'ico');

-- Achievement translations
INSERT INTO achievement_translation (achievement_id, language, name, description) VALUES (1, 'en', 'Digging In', 'Dig your first well');
INSERT INTO achievement_translation (achievement_id, language, name, description) VALUES (2, 'en', 'Big Money', 'Earn 1000 Gold');
INSERT INTO achievement_translation (achievement_id, language, name, description) VALUES (3, 'en', 'Here We Go Again', 'Complete a farming ascention');

-- Game plays
INSERT INTO game_play (count, date, game_id) VALUES (12, '2025-02-17 00:00:00', 1);
INSERT INTO game_play (count, date, game_id) VALUES (17, '2025-02-17 00:00:00', 1);
INSERT INTO game_play (count, date, game_id) VALUES (3, '2025-02-18 00:00:00', 1);
INSERT INTO game_play (count, date, game_id) VALUES (12, '2025-02-18 00:00:00', 3);

-- Game assets
INSERT INTO game_asset (game_id, type, path) VALUES (1, 'ss', 'gameImages/1/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (1, 'ss', 'gameImages/1/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (1, 'ss', 'gameImages/1/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (1, 'ss', 'gameImages/1/4.gif');
INSERT INTO game_asset (game_id, type, path) VALUES (1, 'tile', 'gameImages/1/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (2, 'ss', 'gameImages/2/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (2, 'ss', 'gameImages/2/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (2, 'ss', 'gameImages/2/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (2, 'ss', 'gameImages/2/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (2, 'tile', 'gameImages/2/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (3, 'ss', 'gameImages/3/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (3, 'ss', 'gameImages/3/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (3, 'ss', 'gameImages/3/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (3, 'ss', 'gameImages/3/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (3, 'tile', 'gameImages/3/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (4, 'ss', 'gameImages/4/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (4, 'ss', 'gameImages/4/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (4, 'ss', 'gameImages/4/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (4, 'ss', 'gameImages/4/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (4, 'tile', 'gameImages/4/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (5, 'ss', 'gameImages/5/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (5, 'ss', 'gameImages/5/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (5, 'ss', 'gameImages/5/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (5, 'ss', 'gameImages/5/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (5, 'tile', 'gameImages/5/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (6, 'ss', 'gameImages/6/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (6, 'ss', 'gameImages/6/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (6, 'ss', 'gameImages/6/3.gif');
INSERT INTO game_asset (game_id, type, path) VALUES (6, 'ss', 'gameImages/6/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (6, 'tile', 'gameImages/6/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (7, 'ss', 'gameImages/7/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (7, 'ss', 'gameImages/7/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (7, 'ss', 'gameImages/7/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (7, 'ss', 'gameImages/7/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (7, 'tile', 'gameImages/7/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (8, 'ss', 'gameImages/8/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (8, 'ss', 'gameImages/8/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (8, 'ss', 'gameImages/8/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (8, 'ss', 'gameImages/8/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (8, 'tile', 'gameImages/8/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (9, 'ss', 'gameImages/9/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (9, 'ss', 'gameImages/9/2.jpeg');
INSERT INTO game_asset (game_id, type, path) VALUES (9, 'ss', 'gameImages/9/3.jpeg');
INSERT INTO game_asset (game_id, type, path) VALUES (9, 'tile', 'gameImages/9/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (10, 'ss', 'gameImages/10/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (10, 'ss', 'gameImages/10/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (10, 'ss', 'gameImages/10/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (10, 'ss', 'gameImages/10/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (10, 'tile', 'gameImages/10/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (11, 'ss', 'gameImages/11/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (11, 'ss', 'gameImages/11/2.png');
INSERT INTO game_asset (game_id, type, path) VALUES (11, 'ss', 'gameImages/11/3.png');
INSERT INTO game_asset (game_id, type, path) VALUES (11, 'ss', 'gameImages/11/4.png');
INSERT INTO game_asset (game_id, type, path) VALUES (11, 'ss', 'gameImages/11/5.png');
INSERT INTO game_asset (game_id, type, path) VALUES (11, 'tile', 'gameImages/11/tile.png');

INSERT INTO game_asset (game_id, type, path) VALUES (12, 'ss', 'gameImages/12/1.png');
INSERT INTO game_asset (game_id, type, path) VALUES (12, 'ss', 'gameImages/12/2.jpeg');
INSERT INTO game_asset (game_id, type, path) VALUES (12, 'ss', 'gameImages/12/3.jpeg');
INSERT INTO game_asset (game_id, type, path) VALUES (12, 'tile', 'gameImages/12/tile.png');

-- Reset sequences to continue from the seeded data
SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));
SELECT setval('tag_id_seq', (SELECT MAX(id) FROM tag));
SELECT setval('genre_id_seq', (SELECT MAX(id) FROM genre));
SELECT setval('game_id_seq', (SELECT MAX(id) FROM game));
SELECT setval('achievement_id_seq', (SELECT MAX(id) FROM achievement));
SELECT setval('game_asset_id_seq', (SELECT MAX(id) FROM game_asset));
SELECT setval('game_play_id_seq', (SELECT MAX(id) FROM game_play));
