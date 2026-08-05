import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/browser.js";
import type { StadiumRepository } from "../stadium_repository.js";


export class StadiumPrismaRepository implements StadiumRepository {
    async createStadium(data: Prisma.StadiumCreateInput) {
        return await prisma.stadium.create({ data })
    } 
}