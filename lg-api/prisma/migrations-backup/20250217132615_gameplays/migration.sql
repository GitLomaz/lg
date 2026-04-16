-- CreateTable
CREATE TABLE `game_play` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_gameTogame_play` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_gameTogame_play_AB_unique`(`A`, `B`),
    INDEX `_gameTogame_play_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_gameTogame_play` ADD CONSTRAINT `_gameTogame_play_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gameTogame_play` ADD CONSTRAINT `_gameTogame_play_B_fkey` FOREIGN KEY (`B`) REFERENCES `game_play`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
