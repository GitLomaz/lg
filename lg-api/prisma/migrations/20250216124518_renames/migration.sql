-- CreateTable
CREATE TABLE `achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `game_id` INTEGER NOT NULL,
    `difficulty` VARCHAR(45) NOT NULL,

    INDEX `game_id`(`game_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement_translation` (
    `achievement_id` INTEGER NOT NULL,
    `language` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `achievement_translation_index_0`(`achievement_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_achievementTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_achievementTouser_AB_unique`(`A`, `B`),
    INDEX `_achievementTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `achievement` ADD CONSTRAINT `achievement_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `achievement_translation` ADD CONSTRAINT `achievement_translation_ibfk_1` FOREIGN KEY (`achievement_id`) REFERENCES `achievement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_achievementTouser` ADD CONSTRAINT `_achievementTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `achievement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_achievementTouser` ADD CONSTRAINT `_achievementTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
