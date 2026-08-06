import { prisma } from "@/libs/prisma.js";
import type { MatchRepository } from "./match-repository.js";

export class PrismaMatchRepository implements MatchRepository {
  async findByGroup(groupId: number) {
    const matches = await prisma.match.findMany({
      where: {
        groupId,
      },
      include: {
        gameResult: {
          include: {
            teamAResult: true,
            teamBResult: true,
          },
        },
      },
    });

    return matches.map((match) => ({
      id: match.id,

      teamAId: match.teamAId,
      teamBId: match.teamBId,

      teamAGoals: match.gameResult?.teamAResult.goals ?? 0,
      teamBGoals: match.gameResult?.teamBResult.goals ?? 0,

      finished: match.status === "encerrado",
    }));
  }
}
