import { StadiumPresenter } from "@/http/presenters/stadium_presenter.js";
import { StadiumNotFoundError } from "@/use_cases/errors/stadium_not_found.js";
import { makeUpdateStadiumUseCase } from "@/use_cases/factories/stadium/make_update_stadium.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const updateStadiumBodySchema = z.object({
    name: z.string("O nome do estádio informado é inválido ou inexistente.").min(2, "O nome do estádio deve ter no mínimo 2 caracteres.").max(50, "O nome do estádio deve ter no máximo 50 caracteres.").optional(),
    city: z.string("A cidade do estádio informada é inválida ou inexistente.").min(2, "A cidade do estádio deve ter no mínimo 2 caracteres.").max(100, "A cidade do estádio deve ter no máximo 100 caracteres.").optional(),
    capacity: z.number("A capacidade do estádio informada é inválida ou inexistente.").min(1, "A capacidade do estádio deve ser no mínimo 1.").max(100000, "A capacidade do estádio deve ser no máximo 100000.").optional()
})

export async function updateStadium(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { name, city, capacity } = updateStadiumBodySchema.parse(request.body)
        const { stadiumPublicId } = z.object({ stadiumPublicId: z.string() }).parse(request.params)
        const updateStadiumUseCase = makeUpdateStadiumUseCase()
        const { stadium } = await updateStadiumUseCase.execute({ userPublicId: request.user.sub, stadiumPublicId, name, city, capacity })
        return reply.status(201).send(StadiumPresenter.toHTTP(stadium))
    } catch (error) {
        if (error instanceof StadiumNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
