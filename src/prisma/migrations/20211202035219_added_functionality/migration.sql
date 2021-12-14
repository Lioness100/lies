-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "prefix" TEXT NOT NULL DEFAULT E',',
    "lang" TEXT NOT NULL DEFAULT E'en-US',

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT E'0',
    "Blacklisted" BOOLEAN NOT NULL,
    "Reason" TEXT NOT NULL DEFAULT E'Has Not Been Blacklisted Yet',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT E'0',
    "key" TEXT NOT NULL DEFAULT E'0',
    "Blacklisted" BOOLEAN NOT NULL,
    "ExpiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyAddons" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "key" TEXT NOT NULL DEFAULT E'0',
    "IPLock" BOOLEAN NOT NULL,
    "IP" TEXT NOT NULL DEFAULT E'0',

    CONSTRAINT "KeyAddons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_id_key" ON "ApiKeys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_userId_key" ON "ApiKeys"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_key_key" ON "ApiKeys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "KeyAddons_id_key" ON "KeyAddons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KeyAddons_key_key" ON "KeyAddons"("key");

-- CreateIndex
CREATE UNIQUE INDEX "KeyAddons_IP_key" ON "KeyAddons"("IP");
