import { prisma } from "@/libs/prisma.js";
import type { TeamRepository } from "./team-repository.js";

export class PrismaTeamRepository implements TeamRepository {
  async findByGroup(groupId: number) {
    const teams = await prisma.team.findMany({
      where: {
        groupId,
      },
    });

    return teams.map((team) => ({
      id: team.id,
      publicId: team.publicId,
      name: team.name,
      abbreviation: team.abbreviation,
    }));
  }
}
