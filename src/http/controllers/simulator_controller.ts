import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { StandingService } from "@/services/standings/standings-service.js";
import { SimulateGroupUseCase } from "@/use_cases/simulator/simulate_group.js";
import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js";
import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js";

export async function simulateGroup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    groupId: z.number(),

    matches: z.array(
      z.object({
        matchId: z.number(),
        teamAGoals: z.number().min(0),
        teamBGoals: z.number().min(0),
      }),
    ),
  });

  const { groupId, matches } = bodySchema.parse(request.body);

  const useCase = new SimulateGroupUseCase(
    new TeamPrismaRepository(),
    new MatchPrismaRepository(),
    new StandingService(),
  );

  const result = await useCase.execute({
    groupId,
    matches,
  });

  return reply.status(200).send(result);
}
