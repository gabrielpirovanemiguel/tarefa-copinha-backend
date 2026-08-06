import {
  prisma
} from "./chunk-EDHVKHAN.js";

// src/repositories/prisma-team-repository.ts
var PrismaTeamRepository = class {
  async findByGroup(groupId) {
    const teams = await prisma.team.findMany({
      where: {
        groupId
      }
    });
    return teams.map((team) => ({
      id: team.id,
      publicId: team.publicId,
      name: team.name,
      abbreviation: team.abbreviation
    }));
  }
};

export {
  PrismaTeamRepository
};
//# sourceMappingURL=chunk-ACU3H44E.js.map