-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team_a_id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team_b_id_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team_a_id_fkey" FOREIGN KEY ("team_a_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team_b_id_fkey" FOREIGN KEY ("team_b_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
