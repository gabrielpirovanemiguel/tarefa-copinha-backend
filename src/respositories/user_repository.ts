import type { User, Prisma } from "@/@types/prisma/client.js";

export interface UserRepository {
    getUserByPublicId(publicId: string, include?: Prisma.UserInclude): Promise<User | null>
}