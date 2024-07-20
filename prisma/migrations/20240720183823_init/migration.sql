-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "externalId" VARCHAR(255),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
