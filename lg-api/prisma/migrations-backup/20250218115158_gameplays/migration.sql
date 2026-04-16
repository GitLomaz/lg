/*
  Warnings:

  - You are about to drop the `_gameTogame_play` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `game_id` to the `game_play` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_gameTogame_play` DROP FOREIGN KEY `_gameTogame_play_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gameTogame_play` DROP FOREIGN KEY `_gameTogame_play_B_fkey`;

-- AlterTable
ALTER TABLE `game_play` ADD COLUMN `game_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_gameTogame_play`;

-- AddForeignKey
ALTER TABLE `game_play` ADD CONSTRAINT `game_play_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
