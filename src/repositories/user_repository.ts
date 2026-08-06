import type { User, Prisma } from "@/@types/prisma/client.js";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    getUserByPublicId(publicId: string, include?: Prisma.UserInclude): Promise<User | null>
}