-- CreateTable
CREATE TABLE `auth_providers` (
    `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
    `user_id` INTEGER NOT NULL,
    `provider_name` VARCHAR(255) NOT NULL,
    `provider_user_id` VARCHAR(255) NOT NULL,
    `access_token` TEXT NULL,
    `refresh_token` TEXT NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `auth_providers_index_1`(`provider_name`, `provider_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iframe` VARCHAR(1024) NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `author_id` INTEGER NULL,
    `genre_id` INTEGER NOT NULL,

    INDEX `author_id`(`author_id`),
    INDEX `genre_id`(`genre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `game_id` INTEGER NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `path` VARCHAR(256) NULL,

    INDEX `game_id`(`game_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_comment` (
    `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
    `game_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `parent` CHAR(36) NULL,
    `value` TEXT NULL,

    INDEX `game_id`(`game_id`),
    INDEX `parent`(`parent`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_comment_like` (
    `game_comment_id` CHAR(36) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 1,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`game_comment_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_favorite` (
    `game_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`game_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_like` (
    `game_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL DEFAULT 1,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`game_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_tag` (
    `game_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    INDEX `tag_id`(`tag_id`),
    PRIMARY KEY (`game_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_translation` (
    `game_id` INTEGER NOT NULL,
    `language` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `instructions` TEXT NULL,

    UNIQUE INDEX `game_translation_index_0`(`game_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwords` (
    `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
    `user_id` INTEGER NOT NULL,
    `password_hash` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
    `user_id` INTEGER NOT NULL,
    `session_token` VARCHAR(256) NOT NULL,
    `user_agent` TEXT NULL,
    `ip_address` VARCHAR(45) NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `session_token`(`session_token`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `developer` BOOLEAN NULL DEFAULT false,
    `image` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_providers` ADD CONSTRAINT `auth_providers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_asset` ADD CONSTRAINT `game_asset_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_comment` ADD CONSTRAINT `game_comment_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_comment` ADD CONSTRAINT `game_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_comment` ADD CONSTRAINT `game_comment_ibfk_3` FOREIGN KEY (`parent`) REFERENCES `game_comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_comment_like` ADD CONSTRAINT `game_comment_like_ibfk_1` FOREIGN KEY (`game_comment_id`) REFERENCES `game_comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_comment_like` ADD CONSTRAINT `game_comment_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_favorite` ADD CONSTRAINT `game_favorite_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_favorite` ADD CONSTRAINT `game_favorite_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_like` ADD CONSTRAINT `game_like_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_like` ADD CONSTRAINT `game_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_tag` ADD CONSTRAINT `game_tag_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_tag` ADD CONSTRAINT `game_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_translation` ADD CONSTRAINT `game_translation_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `passwords` ADD CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
