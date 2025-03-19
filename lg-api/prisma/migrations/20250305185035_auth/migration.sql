/*
  Warnings:

  - A unique constraint covering the columns `[verification_token]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `expires_at` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_ibfk_1`;

-- AlterTable
ALTER TABLE `sessions` ALTER COLUMN `id` DROP DEFAULT,
    MODIFY `expires_at` TIMESTAMP(0) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verification_token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_verification_token_key` ON `user`(`verification_token`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `session_token` TO `sessions_session_token_key`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `user_id` TO `sessions_user_id_idx`;
