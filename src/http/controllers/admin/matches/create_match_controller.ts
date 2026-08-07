import { STATUS_MATCH } from "@/@types/prisma/enums.js";
import { MatchPresenter } from "@/http/presenters/match_presenter.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { StadiumNotFoundError } from "@/use_cases/errors/stadium_not_found.js";
import { TeamNotFoundError } from "@/use_cases/errors/team_not_found.js";
import { makeCreateMatchUseCase } from "@/use_cases/factories/matches/make_create_match.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createMatchBodySchema = z.object({
    date: z.coerce.date("A data da partida informada é inválida ou inexistente."),
    status: z.enum(STATUS_MATCH, "O status da partida informado é inválido ou inexistente."),
    groupPublicId: z.string("O publicId do grupo informado é inválido ou inexistente.").min(1, "O publicId do grupo deve ter no mínimo 1 caractere.").max(50, "O publicId do grupo deve ter no máximo 50 caracteres."),
    teamAPublicId: z.string("O publicId do time A informado é inválido ou inexistente.").min(1, "O publicId do time A deve ter no mínimo 1 caractere.").max(50, "O publicId do time A deve ter no máximo 50 caracteres."),
    teamBPublicId: z.string("O publicId do time B informado é inválido ou inexistente.").min(1, "O publicId do time B deve ter no mínimo 1 caractere.").max(50, "O publicId do time B deve ter no máximo 50 caracteres."),
    stadiumPublicId: z.string("O publicId do estádio informado é inválido ou inexistente.").min(1, "O publicId do estádio deve ter no mínimo 1 caractere.").max(50, "O publicId do estádio deve ter no máximo 50 caracteres.")
}).refine((data) => data.teamAPublicId !== data.teamBPublicId, {
    message: "O time A e o time B não podem ser o mesmo time.",
})

export async function createMatch( 
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { date, status, groupPublicId, teamAPublicId, teamBPublicId, stadiumPublicId } = createMatchBodySchema.parse(request.body)
        const createMatchUseCase = makeCreateMatchUseCase()
        const {match} = await createMatchUseCase.execute({date, status, groupPublicId, teamAPublicId, teamBPublicId, stadiumPublicId})
        return reply.status(201).send(MatchPresenter.toHTTP(match))
    } catch (error) {
        if (error instanceof GroupNotFoundError || error instanceof TeamNotFoundError || error instanceof StadiumNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        throw error
    }
}