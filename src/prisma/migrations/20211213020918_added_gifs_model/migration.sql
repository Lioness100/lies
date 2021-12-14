-- CreateTable
CREATE TABLE "GIFS" (
    "id" SERIAL NOT NULL,
    "gifURL" TEXT NOT NULL,
    "gifType" TEXT NOT NULL,
    "DateAdded" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GIFS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GIFS_id_key" ON "GIFS"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GIFS_gifURL_key" ON "GIFS"("gifURL");
