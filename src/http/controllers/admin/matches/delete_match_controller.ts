import { MatchNotFoundError } from "@/use_cases/errors/match_not_found.js";
import { makeDeleteMatchUseCase } from "@/use_cases/factories/matches/make_delete_match.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteMatch(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { matchPublicId } = z.object({ matchPublicId: z.string() }).parse(request.params)
        const deleteMatchUseCase = makeDeleteMatchUseCase()
        await deleteMatchUseCase.execute({ matchPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Partida deletada com sucesso." })
    } catch (error) {
        if (error instanceof MatchNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
