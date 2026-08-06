import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { PrismaMatchRepository } from "@/repositories/prisma-match-repository.js";
import { PrismaTeamRepository } from "@/repositories/prisma-team-repository.js";
import { StandingService } from "@/services/standings/standings-service.js";
import { SimulateGroupUseCase } from "@/use_cases/simulator/simulate-group.js";

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
    new PrismaTeamRepository(),
    new PrismaMatchRepository(),
    new StandingService(),
  );

  const result = await useCase.execute({
    groupId,
    matches,
  });

  return reply.status(200).send(result);
}
