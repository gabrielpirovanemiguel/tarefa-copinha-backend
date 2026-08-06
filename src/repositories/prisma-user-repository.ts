import { prisma } from "@/libs/prisma.js";
import type { UserRepository } from "./user-repository.js";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findUnique({
      where: {
        publicId,
      },
    });
  }
}
