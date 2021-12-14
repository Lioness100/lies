-- CreateTable
CREATE TABLE "Pastes" (
    "id" SERIAL NOT NULL,
    "pasteId" TEXT NOT NULL DEFAULT E'0',
    "pasteText" TEXT NOT NULL DEFAULT E'This Is Some Text.',
    "pasteDate" TIMESTAMP(3) NOT NULL,
    "pasteSyntax" TEXT NOT NULL,

    CONSTRAINT "Pastes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pastes_id_key" ON "Pastes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pastes_pasteId_key" ON "Pastes"("pasteId");
