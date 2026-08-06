import type { Prisma } from "@/@types/prisma/client.js";
import type { LogRepository } from "../log_repository.js";
import { prisma } from "@/libs/prisma.js";

export class LogPrismaRepository implements LogRepository {
    async generateLog(data: Prisma.LogCreateInput) {
        await prisma.log.create({data})
    }
}