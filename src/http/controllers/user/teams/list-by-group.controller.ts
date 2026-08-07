import { TeamPresenter } from "@/http/presenters/team_presenter.js";
import { makeListTeamsByGroupUseCase } from "@/use_cases/factories/teams/make-list-by-group.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function listTeamsByGroup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listTeamsByGroupParamsSchema = z.object({
      groupId: z.coerce.number(),
    });

    const { groupId } =
      listTeamsByGroupParamsSchema.parse(request.params);

    const listTeamsByGroupUseCase =
      makeListTeamsByGroupUseCase();

    const { teams } =
      await listTeamsByGroupUseCase.execute({
        groupId,
      });

    return reply.status(200).send({
      teams: TeamPresenter.toHTTP(teams),
    });

  } catch (error) {
    throw error;
  }
}