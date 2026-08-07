-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_stadium_id_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "Stadium"("id") ON DELETE CASCADE ON UPDATE CASCADE;
