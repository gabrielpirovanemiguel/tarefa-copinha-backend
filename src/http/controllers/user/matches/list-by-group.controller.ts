import { MatchPresenter } from "@/http/presenters/match_presenter.js";
import { makeListMatchByGroupUseCase } from "@/use_cases/factories/matches/make-list-by-group.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function listMatchesByGroup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listMatchesParamsSchema = z.object({
      groupId: z.coerce.number(),
    });

    const { groupId } = listMatchesParamsSchema.parse(request.params);

    const listMatchByGroupUseCase =
      makeListMatchByGroupUseCase();

    const { matches } =
      await listMatchByGroupUseCase.execute({
        groupId,
      });

    return reply
      .status(200)
      .send({
        matches: MatchPresenter.RawtoHTTP(matches),
      });

  } catch (error) {
    throw error;
  }
}