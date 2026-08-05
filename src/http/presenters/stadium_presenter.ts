import type { Stadium} from "@/@types/prisma/client.js"

interface HTTPStadium {
    id: string
    nome: string
    cidade: string
    capacidade: number
    criadoEm: Date
    atualizadoEm: Date
}

export class StadiumPresenter {
    static toHTTP(stadium: Stadium): HTTPStadium
    static toHTTP(stadiums: Stadium[]): HTTPStadium[]
    static toHTTP(input: Stadium | Stadium[]): HTTPStadium | HTTPStadium[] {
        if (Array.isArray(input)) {
            return input.map((s) => this.toHTTP(s))
        }

        return {
            id: input.publicId,
            nome: input.name,
            cidade: input.city,
            capacidade: input.capacity,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }
}