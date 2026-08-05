import type { Group } from "@/@types/prisma/client.js"

interface HTTPGroup {
    id: string
    nome: string
    criadoEm: Date
    atualizadoEm: Date
}

export class GroupPresenter {
    static toHTTP(group: Group): HTTPGroup
    static toHTTP(groups: Group[]): HTTPGroup[]
    static toHTTP(input: Group | Group[]): HTTPGroup | HTTPGroup[] {
        if (Array.isArray(input)) {
            return input.map((g) => this.toHTTP(g))
        }

        return {
            id: input.publicId,
            nome: input.name,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }
}