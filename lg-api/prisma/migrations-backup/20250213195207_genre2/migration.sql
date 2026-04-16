/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `game_ibfk_2`;

-- DropTable
DROP TABLE `Genre`;

-- CreateTable
CREATE TABLE `genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
