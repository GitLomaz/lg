/*
  Warnings:

  - The primary key for the `statistic` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "statistic" DROP CONSTRAINT "statistic_pkey",
ADD COLUMN     "game" VARCHAR(64) NOT NULL DEFAULT '0',
ADD CONSTRAINT "statistic_pkey" PRIMARY KEY ("ip_address", "game");
