/*
  Warnings:

  - Added the required column `icon_path` to the `achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `achievement` ADD COLUMN `icon_path` VARCHAR(256) NOT NULL;
