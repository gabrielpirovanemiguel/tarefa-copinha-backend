import { STATUS_MATCH } from "@/@types/prisma/enums.js";
import { MatchPresenter } from "@/http/presenters/match_presenter.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { MatchNotFoundError } from "@/use_cases/errors/match_not_found.js";
import { SameTeamError } from "@/use_cases/errors/same_team.js";
import { StadiumNotFoundError } from "@/use_cases/errors/stadium_not_found.js";
import { TeamNotFoundError } from "@/use_cases/errors/team_not_found.js";
import { UserNotFoundError } from "@/use_cases/errors/user_not_found.js";
import { makeUpdateMatchUseCase } from "@/use_cases/factories/matches/make_update_match.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const updateMatchBodySchema = z.object({
    date: z.coerce.date("A data da partida informada é inválida ou inexistente.").optional(),
    status: z.enum(STATUS_MATCH, "O status da partida informado é inválido ou inexistente.").optional(),
    groupPublicId: z.string("O publicId do grupo informado é inválido ou inexistente.").min(1, "O publicId do grupo deve ter no mínimo 1 caractere.").max(50, "O publicId do grupo deve ter no máximo 50 caracteres.").optional(),
    teamAPublicId: z.string("O publicId do time A informado é inválido ou inexistente.").min(1, "O publicId do time A deve ter no mínimo 1 caractere.").max(50, "O publicId do time A deve ter no máximo 50 caracteres.").optional(),
    teamBPublicId: z.string("O publicId do time B informado é inválido ou inexistente.").min(1, "O publicId do time B deve ter no mínimo 1 caractere.").max(50, "O publicId do time B deve ter no máximo 50 caracteres.").optional(),
    stadiumPublicId: z.string("O publicId do estádio informado é inválido ou inexistente.").min(1, "O publicId do estádio deve ter no mínimo 1 caractere.").max(50, "O publicId do estádio deve ter no máximo 50 caracteres.").optional()
}).refine((data) => !data.teamAPublicId || !data.teamBPublicId || data.teamAPublicId !== data.teamBPublicId, {
    message: "O time A e o time B não podem ser o mesmo time.",
})

export async function updateMatch(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { date, status, groupPublicId, teamAPublicId, teamBPublicId, stadiumPublicId } = updateMatchBodySchema.parse(request.body)
        const { matchPublicId } = z.object({ matchPublicId: z.string() }).parse(request.params)
        const updateMatchUseCase = makeUpdateMatchUseCase()
        const { match } = await updateMatchUseCase.execute({ userPublicId: request.user.sub, matchPublicId, date, status, groupPublicId, teamAPublicId, teamBPublicId, stadiumPublicId })
        return reply.status(201).send(MatchPresenter.toHTTP(match))
    } catch (error) {
        if (error instanceof GroupNotFoundError || error instanceof TeamNotFoundError || error instanceof StadiumNotFoundError || error instanceof MatchNotFoundError || error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        if (error instanceof SameTeamError) {
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }
}
