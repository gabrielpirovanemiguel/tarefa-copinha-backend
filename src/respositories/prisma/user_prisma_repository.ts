import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/client.js";
import type { UserRepository } from "../user_repository.js";

export class UserPrismaRepository implements UserRepository {
    async getUserByPublicId(publicId: string, include?: Prisma.UserInclude) {
        return await prisma.user.findUnique({ where: { publicId }, include })
    }
}