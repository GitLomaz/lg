/*
  Warnings:

  - A unique constraint covering the columns `[game_id,user_id]` on the table `game_rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `game_rating_game_id_user_id_key` ON `game_rating`(`game_id`, `user_id`);
