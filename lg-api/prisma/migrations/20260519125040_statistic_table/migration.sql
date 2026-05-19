-- CreateTable
CREATE TABLE "statistic" (
    "ip_address" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "statistic_pkey" PRIMARY KEY ("ip_address")
);
