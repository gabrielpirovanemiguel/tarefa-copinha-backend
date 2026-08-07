import { TeamNotFoundError } from "@/use_cases/errors/team_not_found.js";
import { makeDeleteTeamUseCase } from "@/use_cases/factories/teams/make_delete_team.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteTeam(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { teamPublicId } = z.object({ teamPublicId: z.string() }).parse(request.params)
        const deleteTeamUseCase = makeDeleteTeamUseCase()
        await deleteTeamUseCase.execute({ teamPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Time deletado com sucesso." })
    } catch (error) {
        if (error instanceof TeamNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
