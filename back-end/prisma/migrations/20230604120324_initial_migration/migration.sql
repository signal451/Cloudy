-- CreateTable
CREATE TABLE "client" (
    "client_id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(8) NOT NULL,
    "client_password" VARCHAR(80) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "profile_image" VARCHAR(255),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "client_role" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(15) NOT NULL,

    CONSTRAINT "client_role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "episodes_id" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "season_id" INTEGER NOT NULL,
    "subtitle_id" INTEGER NOT NULL,
    "duration" INTEGER,
    "file" VARCHAR(255),
    "visible" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "thumbnail" VARCHAR(255),

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("episodes_id")
);

-- CreateTable
CREATE TABLE "genre" (
    "genre_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "my_library" (
    "library_id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "show_id" INTEGER,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "my_library_pkey" PRIMARY KEY ("library_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "subscription_id" INTEGER,
    "amount" INTEGER,
    "status" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_method" (
    "id" SERIAL NOT NULL,
    "method_name" VARCHAR(20) NOT NULL,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season" (
    "season_id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,

    CONSTRAINT "season_pkey" PRIMARY KEY ("season_id")
);

-- CreateTable
CREATE TABLE "shows" (
    "show_id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "featured_image" VARCHAR(255) NOT NULL,
    "visible" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(6),
    "status_id" INTEGER NOT NULL,
    "cover_image" VARCHAR,
    "trending_image" VARCHAR(255),
    "subscription_type" VARCHAR(5),

    CONSTRAINT "shows_pkey" PRIMARY KEY ("show_id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_plan" (
    "id" SERIAL NOT NULL,
    "plan_details" VARCHAR(10),
    "plan_price" INTEGER,

    CONSTRAINT "subscription_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "plan_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtitle" (
    "subtitle_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "subtitle_pkey" PRIMARY KEY ("subtitle_id")
);

-- CreateTable
CREATE TABLE "genre_has_show" (
    "id" SERIAL NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "show_id" INTEGER NOT NULL,

    CONSTRAINT "genre_has_show_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_phone_number_key" ON "client"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "unique_show" ON "my_library"("show_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_title" ON "shows"("title");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plan_plan_details_key" ON "subscription_plan"("plan_details");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "fk_client_role" FOREIGN KEY ("role_id") REFERENCES "client_role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "fk_episode_category" FOREIGN KEY ("subtitle_id") REFERENCES "subtitle"("subtitle_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "fk_episode_season" FOREIGN KEY ("season_id") REFERENCES "season"("season_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_library" ADD CONSTRAINT "fk_client_library" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_library" ADD CONSTRAINT "fk_library_show" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "fk_payment_subscription" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "fk_season_show" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shows" ADD CONSTRAINT "fk_show_status" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "fk_subscription_client" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "fk_subscription_plan" FOREIGN KEY ("plan_id") REFERENCES "subscription_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre_has_show" ADD CONSTRAINT "fk_multiple_show" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre_has_show" ADD CONSTRAINT "fk_show_has_multiple_genre" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;
