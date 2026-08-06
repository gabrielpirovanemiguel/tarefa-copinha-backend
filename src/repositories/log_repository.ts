import type { Prisma } from "@/@types/prisma/client.js";

export interface LogRepository {
    generateLog(data: Prisma.LogCreateInput): Promise<void>
}