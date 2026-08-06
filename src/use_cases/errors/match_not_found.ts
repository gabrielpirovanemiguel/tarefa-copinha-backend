
export class MatchNotFoundError extends Error {
    constructor() {
        super("Não foi encnontrado nenhuma partida com o ID fornecido.")
    }
}