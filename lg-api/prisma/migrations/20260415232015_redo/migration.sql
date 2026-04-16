-- CreateTable
CREATE TABLE "auth_providers" (
    "id" CHAR(36) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_name" VARCHAR(255) NOT NULL,
    "provider_user_id" VARCHAR(255) NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "game_string" VARCHAR(64) NOT NULL,
    "iframe" VARCHAR(1024) NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "author_id" INTEGER,
    "genre_id" INTEGER NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_asset" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "type" VARCHAR(45) NOT NULL,
    "path" VARCHAR(256),

    CONSTRAINT "game_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_play" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_play_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "difficulty" VARCHAR(45) NOT NULL,
    "icon_path" VARCHAR(256) NOT NULL,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement_translation" (
    "achievement_id" INTEGER NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT
);

-- CreateTable
CREATE TABLE "game_comment" (
    "id" CHAR(36) NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent" CHAR(36),
    "value" TEXT,

    CONSTRAINT "game_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_comment_like" (
    "game_comment_id" CHAR(36) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "game_comment_like_pkey" PRIMARY KEY ("game_comment_id","user_id")
);

-- CreateTable
CREATE TABLE "game_favorite" (
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "game_favorite_pkey" PRIMARY KEY ("game_id","user_id")
);

-- CreateTable
CREATE TABLE "game_rating" (
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "game_rating_pkey" PRIMARY KEY ("game_id","user_id")
);

-- CreateTable
CREATE TABLE "game_translation" (
    "game_id" INTEGER NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "tagline" TEXT,
    "description" TEXT,
    "instructions" TEXT
);

-- CreateTable
CREATE TABLE "passwords" (
    "id" CHAR(36) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" CHAR(36) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "session_token" VARCHAR(256) NOT NULL,
    "user_agent" TEXT,
    "ip_address" VARCHAR(45),
    "expires_at" TIMESTAMP(0) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "developer" BOOLEAN DEFAULT false,
    "image" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "score" BIGINT,
    "timestamp" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "game" VARCHAR(64) DEFAULT '0',
    "level" INTEGER DEFAULT 0,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gameTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_gameTotag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_achievementTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_achievementTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "auth_providers_user_id_idx" ON "auth_providers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_providers_index_1" ON "auth_providers"("provider_name", "provider_user_id");

-- CreateIndex
CREATE INDEX "game_author_id_idx" ON "game"("author_id");

-- CreateIndex
CREATE INDEX "game_genre_id_idx" ON "game"("genre_id");

-- CreateIndex
CREATE INDEX "game_asset_game_id_idx" ON "game_asset"("game_id");

-- CreateIndex
CREATE INDEX "game_play_game_id_idx" ON "game_play"("game_id");

-- CreateIndex
CREATE INDEX "achievement_game_id_idx" ON "achievement"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_translation_index_0" ON "achievement_translation"("achievement_id", "language");

-- CreateIndex
CREATE INDEX "game_comment_game_id_idx" ON "game_comment"("game_id");

-- CreateIndex
CREATE INDEX "game_comment_parent_idx" ON "game_comment"("parent");

-- CreateIndex
CREATE INDEX "game_comment_user_id_idx" ON "game_comment"("user_id");

-- CreateIndex
CREATE INDEX "game_comment_like_user_id_idx" ON "game_comment_like"("user_id");

-- CreateIndex
CREATE INDEX "game_favorite_user_id_idx" ON "game_favorite"("user_id");

-- CreateIndex
CREATE INDEX "game_rating_user_id_idx" ON "game_rating"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_rating_game_id_user_id_key" ON "game_rating"("game_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_translation_index_0" ON "game_translation"("game_id", "language");

-- CreateIndex
CREATE INDEX "passwords_user_id_idx" ON "passwords"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_verification_token_key" ON "user"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "id_UNIQUE" ON "score"("id");

-- CreateIndex
CREATE INDEX "_gameTotag_B_index" ON "_gameTotag"("B");

-- CreateIndex
CREATE INDEX "_achievementTouser_B_index" ON "_achievementTouser"("B");

-- AddForeignKey
ALTER TABLE "auth_providers" ADD CONSTRAINT "auth_providers_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_ibfk_1" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_ibfk_2" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_asset" ADD CONSTRAINT "game_asset_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_play" ADD CONSTRAINT "game_play_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievement_translation" ADD CONSTRAINT "achievement_translation_ibfk_1" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_comment" ADD CONSTRAINT "game_comment_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_comment" ADD CONSTRAINT "game_comment_ibfk_2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_comment" ADD CONSTRAINT "game_comment_ibfk_3" FOREIGN KEY ("parent") REFERENCES "game_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_comment_like" ADD CONSTRAINT "game_comment_like_ibfk_1" FOREIGN KEY ("game_comment_id") REFERENCES "game_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_comment_like" ADD CONSTRAINT "game_comment_like_ibfk_2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_favorite" ADD CONSTRAINT "game_favorite_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_favorite" ADD CONSTRAINT "game_favorite_ibfk_2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_rating" ADD CONSTRAINT "game_rating_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_rating" ADD CONSTRAINT "game_rating_ibfk_2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_translation" ADD CONSTRAINT "game_translation_ibfk_1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameTotag" ADD CONSTRAINT "_gameTotag_A_fkey" FOREIGN KEY ("A") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameTotag" ADD CONSTRAINT "_gameTotag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_achievementTouser" ADD CONSTRAINT "_achievementTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_achievementTouser" ADD CONSTRAINT "_achievementTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
