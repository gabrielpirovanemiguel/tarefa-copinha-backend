import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { makeDeleteGroupUseCase } from "@/use_cases/factories/groups/make_delete_group.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteGroup(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { groupPublicId } = z.object({ groupPublicId: z.string() }).parse(request.params)
        const deleteGroupUseCase = makeDeleteGroupUseCase()
        await deleteGroupUseCase.execute({ groupPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Grupo deletado com sucesso." })
    } catch (error) {
        if (error instanceof GroupNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
