import { MatchResultPresenter } from "@/http/presenters/match_result_presenter.js";
import { MatchResultNotFoundError } from "@/use_cases/errors/match_result_not_found.js";
import { makeUpdateMatchResultUseCase } from "@/use_cases/factories/results/make_update_match_result.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const updateMatchResultBodySchema = z.object({
    teamAGols: z.number("O número de gols do time A informado é inválido ou inexistente.").optional(),
    teamBGols: z.number("O número de gols do time B informado é inválido ou inexistente.").optional(),
})

export async function updateMatchResult(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { teamAGols, teamBGols } = updateMatchResultBodySchema.parse(request.body)
        const { matchResultPublicId } = z.object({ matchResultPublicId: z.string() }).parse(request.params)
        const updateMatchResultUseCase = makeUpdateMatchResultUseCase()
        const { matchResult } = await updateMatchResultUseCase.execute({ userPublicId: request.user.sub, matchResultPublicId, teamAGols, teamBGols })
        return reply.status(201).send(MatchResultPresenter.toHTTP(matchResult))
    } catch (error) {
        if (error instanceof MatchResultNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
