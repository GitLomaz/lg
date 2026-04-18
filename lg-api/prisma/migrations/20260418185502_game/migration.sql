/*
  Warnings:

  - The required column `key` was added to the `game` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "game" 
  ADD COLUMN  "chat" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN     "key" CHAR(36) NOT NULL, 
  RENAME COLUMN disabled TO unlisted;
