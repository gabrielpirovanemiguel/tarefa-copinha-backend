import { MatchResultNotFoundError } from "@/use_cases/errors/match_result_not_found.js";
import { makeDeleteMatchResultUseCase } from "@/use_cases/factories/results/make_delete_match_result.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteMatchResult(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { matchResultPublicId } = z.object({ matchResultPublicId: z.string() }).parse(request.params)
        const deleteMatchResultUseCase = makeDeleteMatchResultUseCase()
        await deleteMatchResultUseCase.execute({ matchResultPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Resultado de partida deletado com sucesso." })
    } catch (error) {
        if (error instanceof MatchResultNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
