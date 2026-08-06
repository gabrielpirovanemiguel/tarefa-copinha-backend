/*
  Warnings:

  - You are about to drop the `GameResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_match_id_fkey";

-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_team_a_result_id_fkey";

-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_team_b_result_id_fkey";

-- DropTable
DROP TABLE "GameResult";

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "team_a_result_id" INTEGER NOT NULL,
    "team_b_result_id" INTEGER NOT NULL,
    "match_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_public_id_key" ON "MatchResult"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_team_a_result_id_key" ON "MatchResult"("team_a_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_team_b_result_id_key" ON "MatchResult"("team_b_result_id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_match_id_key" ON "MatchResult"("match_id");

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_team_a_result_id_fkey" FOREIGN KEY ("team_a_result_id") REFERENCES "TeamAResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_team_b_result_id_fkey" FOREIGN KEY ("team_b_result_id") REFERENCES "TeamBResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
