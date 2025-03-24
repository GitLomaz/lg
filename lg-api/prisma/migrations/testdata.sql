INSERT INTO `lomazGames`.`user` (`id`, `username`, `developer`, `email`, `is_verified`) VALUES ('1', 'Lomaz', '1', 'ianlomas1@gmail.com', '1');
INSERT INTO `lomazGames`.`passwords` (`user_id`, `password_hash`) VALUES ('1', '$2b$10$Tt9r5bZv8JjJCcwD3Ko.9.MFbmC1wI2sUXBr.lZWFdVb6K3ZHn6ui');

INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('1', 'Short');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('2', 'Single Player');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('3', 'Mouse Only');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('4', '2D');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('5', '3D');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('6', 'Incremental');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('7', 'Keyboard Only');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('8', 'Offline Multiplayer');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('9', 'Relaxing');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('10', 'High Scores');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('11', 'MMO');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('12', 'SciFi');
INSERT INTO `lomazGames`.`tag` (`id`, `name`) VALUES ('13', 'Retro');

INSERT INTO `lomazGames`.`genre` (`id`, `name`) VALUES ('1', 'Arcade');
INSERT INTO `lomazGames`.`genre` (`id`, `name`) VALUES ('2', 'Action');
INSERT INTO `lomazGames`.`genre` (`id`, `name`) VALUES ('3', 'Idle');
INSERT INTO `lomazGames`.`genre` (`id`, `name`) VALUES ('4', 'Puzzle');
INSERT INTO `lomazGames`.`genre` (`id`, `name`) VALUES ('5', 'Clicker');

INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('1', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '3', 'ceres');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('2', 'https://us-dev.nightscapes.io/farmer/', '1080', '720', '1', '4', 'corruption2');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('3', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '3', 'plinko');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('4', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '2', 'snowball');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('5', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '2', 'infinitybreak');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('6', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '2', 'nightscapes');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('7', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '4', 'spaced');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('8', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '2', 'slashArena');
INSERT INTO `lomazGames`.`game` (`id`, `iframe`, `width`, `height`, `author_id`, `genre_id`, `game_string`) VALUES ('9', 'https://us-dev.nightscapes.io/farmer/', '1180', '720', '1', '5', 'stacked');

INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('1', '2');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('1', '3');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('1', '6');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('1', '9');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('2', '3');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('2', '8');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('3', '3');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('3', '9');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('3', '2');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('4', '1');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('4', '10');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('4', '4');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('5', '13');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('5', '12');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('5', '10');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('6', '11');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('6', '4');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('7', '2');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('7', '1');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('7', '12');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('8', '1');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('8', '10');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('9', '12');
INSERT INTO `lomazGames`.`_gameTotag` (`A`, `B`) VALUES ('9', '6');

INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('1', '1', '3');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('1', '2', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('2', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('3', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('4', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('5', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('6', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('7', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('8', '1', '5');
INSERT INTO `lomazGames`.`game_rating` (`game_id`, `user_id`, `value`) VALUES ('9', '1', '5');

INSERT INTO `lomazGames`.`game_favorite` (`game_id`, `user_id`) VALUES ('1', '2');
INSERT INTO `lomazGames`.`game_favorite` (`game_id`, `user_id`) VALUES ('5', '2');
INSERT INTO `lomazGames`.`game_favorite` (`game_id`, `user_id`) VALUES ('1', '1');
INSERT INTO `lomazGames`.`game_favorite` (`game_id`, `user_id`) VALUES ('2', '2');

INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('1', 'en', 'Harvest Horizons', 'A farming game like no other!', 'Plant crops, harvest, click around!');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('2', 'en', 'Corruption II', 'A back and forth battle of will', 'Click on a node to rotate, take over the world');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('3', 'en', 'Idle Plinko', 'plinkoooooo', 'click balls, spend upgrades');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('4', 'en', 'Snowball', 'A major snowfight', 'See instructions ingame');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('5', 'en', 'Infinity Break', 'An epic space shooter', 'space to shoot, M for missiles?');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('6', 'en', 'Nightscapes', 'A mysterious MMO', 'Click to explore, instructions ingame');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('7', 'en', 'Spaced II', 'A puzzle out of this world', 'WASD to move');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('8', 'en', 'Slash Arena', 'An action packed melee battle', 'WASD to move, mouse to aim and attack');
INSERT INTO `lomazGames`.`game_translation` (`game_id`, `language`, `name`, `description`, `instructions`) VALUES ('9', 'en', 'Stacked Idle', 'Build those bricks!', 'Click things');

INSERT INTO `lomazGames`.`achievement` (`game_id`, `difficulty`, `icon_path`) VALUES ('1', 'easy', 'ico');
INSERT INTO `lomazGames`.`achievement` (`game_id`, `difficulty`, `icon_path`) VALUES ('1', 'medium', 'ico');
INSERT INTO `lomazGames`.`achievement` (`game_id`, `difficulty`, `icon_path`) VALUES ('1', 'hard', 'ico');

INSERT INTO `lomazGames`.`achievement_translation` (`achievement_id`, `language`, `name`, `description`) VALUES ('1', 'en', 'Digging In', 'Dig your first well');
INSERT INTO `lomazGames`.`achievement_translation` (`achievement_id`, `language`, `name`, `description`) VALUES ('2', 'en', 'Big Money', 'Earn 1000 Gold');
INSERT INTO `lomazGames`.`achievement_translation` (`achievement_id`, `language`, `name`, `description`) VALUES ('3', 'en', 'Here We Go Again', 'Complete a farming ascention');

INSERT INTO `lomazGames`.`game_play` (`count`, `date`, `game_id`) VALUES ('12', '2025-02-17 00:00:00', '1');
INSERT INTO `lomazGames`.`game_play` (`count`, `date`, `game_id`) VALUES ('17', '2025-02-17 00:00:00', '1');
INSERT INTO `lomazGames`.`game_play` (`count`, `date`, `game_id`) VALUES ('3', '2025-02-18 00:00:00', '1');
INSERT INTO `lomazGames`.`game_play` (`count`, `date`, `game_id`) VALUES ('12', '2025-02-18 00:00:00', '3');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('1', 'ss', 'gameImages/1/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('1', 'ss', 'gameImages/1/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('1', 'ss', 'gameImages/1/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('1', 'ss', 'gameImages/1/4.gif');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('1', 'tile', 'gameImages/1/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('2', 'ss', 'gameImages/2/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('2', 'ss', 'gameImages/2/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('2', 'ss', 'gameImages/2/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('2', 'ss', 'gameImages/2/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('2', 'tile', 'gameImages/2/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('3', 'ss', 'gameImages/3/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('3', 'ss', 'gameImages/3/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('3', 'ss', 'gameImages/3/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('3', 'ss', 'gameImages/3/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('3', 'tile', 'gameImages/3/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('4', 'ss', 'gameImages/4/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('4', 'ss', 'gameImages/4/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('4', 'ss', 'gameImages/4/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('4', 'ss', 'gameImages/4/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('4', 'tile', 'gameImages/4/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('5', 'ss', 'gameImages/5/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('5', 'ss', 'gameImages/5/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('5', 'ss', 'gameImages/5/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('5', 'ss', 'gameImages/5/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('5', 'tile', 'gameImages/5/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('6', 'ss', 'gameImages/6/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('6', 'ss', 'gameImages/6/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('6', 'ss', 'gameImages/6/3.gif');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('6', 'ss', 'gameImages/6/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('6', 'tile', 'gameImages/6/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('7', 'ss', 'gameImages/7/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('7', 'ss', 'gameImages/7/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('7', 'ss', 'gameImages/7/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('7', 'ss', 'gameImages/7/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('7', 'tile', 'gameImages/7/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('8', 'ss', 'gameImages/8/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('8', 'ss', 'gameImages/8/2.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('8', 'ss', 'gameImages/8/3.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('8', 'ss', 'gameImages/8/4.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('8', 'tile', 'gameImages/8/tile.png');

INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('9', 'ss', 'gameImages/9/1.png');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('9', 'ss', 'gameImages/9/2.jpeg');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('9', 'ss', 'gameImages/9/3.jpeg');
INSERT INTO `lomazGames`.`game_asset` (`game_id`, `type`, `path`) VALUES ('9', 'tile', 'gameImages/9/tile.png');
