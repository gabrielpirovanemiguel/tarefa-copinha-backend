import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/client.js";
import type { GroupRepository } from "../group_repository.js";



export class GroupPrismaRepository implements GroupRepository {

    async createGroup(data: Prisma.GroupCreateInput) {
        return await prisma.group.create({ data })
    }

    async getGroupByPublicId(publicId: string, include?: Prisma.GroupInclude) {
        return await prisma.group.findUnique({ where: { publicId }, include })
    }

    async findGroupWhereUnique(where: Prisma.GroupWhereUniqueInput, include?: Prisma.GroupInclude) {
        return await prisma.group.findUnique({ where, include })
    }
}