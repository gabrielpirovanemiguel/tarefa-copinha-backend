import {
  prisma
} from "./chunk-EDHVKHAN.js";

// src/repositories/prisma-match-repository.ts
var PrismaMatchRepository = class {
  async findByGroup(groupId) {
    const matches = await prisma.match.findMany({
      where: {
        groupId
      },
      include: {
        gameResult: {
          include: {
            teamAResult: true,
            teamBResult: true
          }
        }
      }
    });
    return matches.map((match) => ({
      id: match.id,
      teamAId: match.teamAId,
      teamBId: match.teamBId,
      teamAGoals: match.gameResult?.teamAResult.goals ?? 0,
      teamBGoals: match.gameResult?.teamBResult.goals ?? 0,
      finished: match.status === "encerrado"
    }));
  }
};

export {
  PrismaMatchRepository
};
//# sourceMappingURL=chunk-2G3JV4MP.js.map