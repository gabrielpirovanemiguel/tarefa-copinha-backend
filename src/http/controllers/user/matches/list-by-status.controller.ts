import { STATUS_MATCH } from "@/@types/prisma/client.js";
import { MatchPresenter } from "@/http/presenters/match_presenter.js";
import { makeListMatchByStatusUseCase } from "@/use_cases/factories/matches/make-list-by-status.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function listMatchesByStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    status: z.enum(["todos", "encerrado", "próximo"]),
  });

  const { status } = querySchema.parse(request.query);

  const statusMap = {
    todos: undefined,
    encerrado: STATUS_MATCH.encerrado,
    próximo: STATUS_MATCH.próximo,
  };

  const listMatchByStatusUseCase =
    makeListMatchByStatusUseCase();

  const { filteredMatches } =
    await listMatchByStatusUseCase.execute({
      filter: statusMap[status],
    });

  return reply.status(200).send({
    matches: MatchPresenter.RawtoHTTP(filteredMatches),
  });
}