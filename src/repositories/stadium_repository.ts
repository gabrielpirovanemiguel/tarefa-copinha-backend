import type { Prisma, Stadium} from "@/@types/prisma/client.js";

export interface StadiumRepository {
    createStadium(data: Prisma.StadiumCreateInput): Promise<Stadium>
    getStadiumByPublicId(publicId: string): Promise<Stadium | null>
}