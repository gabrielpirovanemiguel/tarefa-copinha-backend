import { StadiumPresenter } from "@/http/presenters/stadium_presenter.js";
import { makeCreateStadiumUseCase } from "@/use_cases/factories/stadium/make_create_stadium.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createStadiumBodySchema = z.object({
    name: z.string("O nome do estádio informado é inválido ou inexistente.").min(2, "O nome do estádio deve ter no mínimo 2 caracteres.").max(50, "O nome do estádio deve ter no máximo 50 caracteres."),
    city: z.string("A cidade do estádio informada é inválida ou inexistente.").min(2, "A cidade do estádio deve ter no mínimo 2 caracteres.").max(100, "A cidade do estádio deve ter no máximo 100 caracteres."),
    capacity: z.number("A capacidade do estádio informada é inválida ou inexistente.").min(1, "A capacidade do estádio deve ser no mínimo 1.").max(100000, "A capacidade do estádio deve ser no máximo 100000.")
})

export async function createStadium( 
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { name, city, capacity } = createStadiumBodySchema.parse(request.body)
        const createStadiumUseCase = makeCreateStadiumUseCase()
        const {stadium} = await createStadiumUseCase.execute({userPublicId: request.user.sub, name, city, capacity})
        return reply.status(201).send(StadiumPresenter.toHTTP(stadium))
    } catch (error) {
        throw error
    }
}