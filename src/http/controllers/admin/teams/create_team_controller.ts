import { TeamPresenter } from "@/http/presenters/team_presenter.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { TeamAlreadyExistsError } from "@/use_cases/errors/team_already_exists.js";
import { makeCreateTeamUseCase } from "@/use_cases/factories/teams/make_create_team.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createTeamBodySchema = z.object({
    groupPublicId: z.string("O ID do grupo informado é inválido ou inexistente."),
    name: z.string("O nome do time informado é inválido ou inexistente.").min(2, "O nome do time deve ter no mínimo 2 caracteres.").max(100, "O nome do time deve ter no máximo 100 caracteres."),
    abbreviation: z.string("A abreviação do time informada é inválida ou inexistente.").min(2, "A abreviação do time deve ter no mínimo 2 caracteres.").max(10, "A abreviação do time deve ter no máximo 10 caracteres."),
    shieldImageUrl: z.string("A URL do escudo do time informada é inválida ou inexistente.").url("A URL do escudo do time informada é inválida."),
    rankingPosition: z.number("A posição no ranking do time informada é inválida ou inexistente.").int("A posição no ranking do time informada deve ser um número inteiro.").min(1, "A posição no ranking do time informada deve ser maior que 0."),
    wins: z.number("O número de vitórias do time informado é inválido ou inexistente.").int("O número de vitórias do time informado deve ser um número inteiro.").min(0, "O número de vitórias do time informado deve ser maior ou igual a 0."),
    draws: z.number("O número de empates do time informado é inválido ou inexistente.").int("O número de empates do time informado deve ser um número inteiro.").min(0, "O número de empates do time informado deve ser maior ou igual a 0."),
    losses: z.number("O número de derrotas do time informado é inválido ou inexistente.").int("O número de derrotas do time informado deve ser um número inteiro.").min(0, "O número de derrotas do time informado deve ser maior ou igual a 0."),
    goalsFor: z.number("O número de gols pró do time informado é inválido ou inexistente.").int("O número de gols pró do time informado deve ser um número inteiro.").min(0, "O número de gols pró do time informado deve ser maior ou igual a 0."),
    goalsAgainst: z.number("O número de gols contra do time informado é inválido ou inexistente.").int("O número de gols contra do time informado deve ser um número inteiro.").min(0, "O número de gols contra do time informado deve ser maior ou igual a 0."),
    goalsDifference: z.number("O saldo de gols do time informado é inválido ou inexistente.").int("O saldo de gols do time informado deve ser um número inteiro."),
    points: z.number("O número de pontos do time informado é inválido ou inexistente.").int("O número de pontos do time informado deve ser um número inteiro.").min(0, "O número de pontos do time informado deve ser maior ou igual a 0.")
})

export async function createTeam( 
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { 
            name,
            abbreviation,
            shieldImageUrl,
            rankingPosition,
            wins,
            draws,
            losses,
            goalsFor,
            goalsAgainst,
            goalsDifference,
            points,
            groupPublicId
         } = createTeamBodySchema.parse(request.body)
        const createTeamUseCase = makeCreateTeamUseCase()
        const {team} = await createTeamUseCase.execute({userPublicId: request.user.sub, name, abbreviation, shieldImageUrl, rankingPosition, wins, draws, losses, goalsFor, goalsAgainst, goalsDifference, points, groupPublicId})
        
        return reply.status(201).send(TeamPresenter.toHTTP(team))
    } catch (error) {
        if (error instanceof GroupNotFoundError) {
            return reply.status(409).send({message: error.message})
        } else if (error instanceof TeamAlreadyExistsError) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }
}