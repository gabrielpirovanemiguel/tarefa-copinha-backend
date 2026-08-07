-- DropForeignKey
ALTER TABLE "MatchResult" DROP CONSTRAINT "MatchResult_match_id_fkey";

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Função que roda quando um MatchResult é deletado
CREATE OR REPLACE FUNCTION delete_orphan_team_results()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "TeamAResult" WHERE id = OLD.team_a_result_id;
    DELETE FROM "TeamBResult" WHERE id = OLD.team_b_result_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger que dispara a função após o DELETE
CREATE TRIGGER trg_delete_orphan_team_results
AFTER DELETE ON "MatchResult"
FOR EACH ROW
EXECUTE FUNCTION delete_orphan_team_results();