import { StadiumNotFoundError } from "@/use_cases/errors/stadium_not_found.js";
import { makeDeleteStadiumUseCase } from "@/use_cases/factories/stadium/make_delete_stadium.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteStadium(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { stadiumPublicId } = z.object({ stadiumPublicId: z.string() }).parse(request.params)
        const deleteStadiumUseCase = makeDeleteStadiumUseCase()
        await deleteStadiumUseCase.execute({ stadiumPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Estádio deletado com sucesso." })
    } catch (error) {
        if (error instanceof StadiumNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
