/*
  Warnings:

  - You are about to drop the `game_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `game_like` DROP FOREIGN KEY `game_like_ibfk_1`;

-- DropForeignKey
ALTER TABLE `game_like` DROP FOREIGN KEY `game_like_ibfk_2`;

-- DropTable
DROP TABLE `game_like`;

-- CreateTable
CREATE TABLE `game_rating` (
    `game_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 5,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`game_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game_rating` ADD CONSTRAINT `game_rating_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_rating` ADD CONSTRAINT `game_rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
