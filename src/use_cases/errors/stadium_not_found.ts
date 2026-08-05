
export class StadiumNotFoundError extends Error {
    constructor(message?: string) {
        super(message || "Não foi encontrado nenhum estádio com o ID fornecido.")
    }
}