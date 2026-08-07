
export class MatchResultNotFoundError extends Error {
    constructor() {
        super("Não foi encontrado nenhum resultado de partida com o ID fornecido.")
    }
}
