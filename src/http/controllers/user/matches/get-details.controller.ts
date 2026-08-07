import type { FastifyReply, FastifyRequest } from "fastify";
import { MatchNotFoundError } from "@/use_cases/errors/match_not_found.js";
import { makeGetMatchDetailsUseCase } from "@/use_cases/factories/matches/make-get-details.js";
import { MatchPresenter } from "@/http/presenters/match_presenter.js";

import z from "zod";

export async function getMatchDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getMatchParamsSchema = z.object({
      publicId: z.uuid(),
    });

    const { publicId } = getMatchParamsSchema.parse(request.params);

    const getMatchDetailsUseCase = makeGetMatchDetailsUseCase();

    const { match } = await getMatchDetailsUseCase.execute({
      matchId: publicId,
    });

    return reply
      .status(200)
      .send(MatchPresenter.toHTTP(match));

  } catch (error) {
    if (error instanceof MatchNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}