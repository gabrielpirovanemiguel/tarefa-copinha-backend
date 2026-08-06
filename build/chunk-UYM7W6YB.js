import {
  SimulateGroupUseCase
} from "./chunk-JYFMQMM4.js";
import {
  StandingService
} from "./chunk-HDN5YKBQ.js";
import {
  PrismaMatchRepository
} from "./chunk-2G3JV4MP.js";
import {
  PrismaTeamRepository
} from "./chunk-ACU3H44E.js";

// src/http/controllers/simulator.controller.ts
import z from "zod";
async function simulateGroup(request, reply) {
  const bodySchema = z.object({
    groupId: z.number(),
    matches: z.array(
      z.object({
        matchId: z.number(),
        teamAGoals: z.number().min(0),
        teamBGoals: z.number().min(0)
      })
    )
  });
  const { groupId, matches } = bodySchema.parse(request.body);
  const useCase = new SimulateGroupUseCase(
    new PrismaTeamRepository(),
    new PrismaMatchRepository(),
    new StandingService()
  );
  const result = await useCase.execute({
    groupId,
    matches
  });
  return reply.status(200).send(result);
}

export {
  simulateGroup
};
//# sourceMappingURL=chunk-UYM7W6YB.js.map