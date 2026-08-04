/*
  Warnings:

  - You are about to drop the column `place` on the `Match` table. All the data in the column will be lost.
  - Added the required column `stadium_id` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "place",
ADD COLUMN     "stadium_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Stadium" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stadium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stadium_public_id_key" ON "Stadium"("public_id");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "Stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
