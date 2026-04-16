/*
  Warnings:

  - You are about to drop the column `is_genre` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the `game_tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `game_string` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `game_ibfk_2`;

-- DropForeignKey
ALTER TABLE `game_tag` DROP FOREIGN KEY `game_tag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `game_tag` DROP FOREIGN KEY `game_tag_ibfk_2`;

-- AlterTable
ALTER TABLE `game` ADD COLUMN `game_string` VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `is_genre`;

-- DropTable
DROP TABLE `game_tag`;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_gameTotag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_gameTotag_AB_unique`(`A`, `B`),
    INDEX `_gameTotag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_gameTotag` ADD CONSTRAINT `_gameTotag_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameTotag` ADD CONSTRAINT `_gameTotag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
