
export class MatchResultAlreadyExistsError extends Error {
    constructor() {
        super("O resultado da partida já foi registrado.")
    }
}