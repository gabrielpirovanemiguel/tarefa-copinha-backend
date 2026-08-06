import { MatchResultPresenter } from "@/http/presenters/match_result_presenter.js";
import { MatchNotFoundError } from "@/use_cases/errors/match_not_found.js";
import { MatchResultAlreadyExistsError } from "@/use_cases/errors/match_result_already_exists.js";
import { makeCreateMatchResultUseCase } from "@/use_cases/factories/results/make_create_match_result.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createMatchResultBodySchema = z.object({
    teamAGols: z.number("O número de gols do time A informado é inválido ou inexistente."),
    teamBGols: z.number("O número de gols do time B informado é inválido ou inexistente."),
    matchPublicId: z.string("O publicId da partida informado é inválido ou inexistente.").min(1, "O publicId da partida deve ter no mínimo 1 caractere.").max(50, "O publicId da partida deve ter no máximo 50 caracteres.")
})

export async function createMatchResult( 
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { teamAGols, teamBGols, matchPublicId } = createMatchResultBodySchema.parse(request.body)
        const createMatchResultUseCase = makeCreateMatchResultUseCase()
        const {matchResult} = await createMatchResultUseCase.execute({userPublicId: request.user.sub, teamAGols, teamBGols, matchPublicId})
        return reply.status(201).send(MatchResultPresenter.toHTTP(matchResult))
    } catch (error) {
        if (error instanceof MatchNotFoundError || error instanceof MatchResultAlreadyExistsError) {
            return reply.status(404).send({message: error.message})
        }
        throw error
    }
}