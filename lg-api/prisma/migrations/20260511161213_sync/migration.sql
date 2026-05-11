/*
  Warnings:

  - You are about to drop the column `disabled` on the `game` table. All the data in the column will be lost.
  - The required column `key` was added to the `game` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "disabled",
ADD COLUMN     "chat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "highscores" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "key" CHAR(36) NOT NULL,
ADD COLUMN     "unlisted" BOOLEAN NOT NULL DEFAULT false;
