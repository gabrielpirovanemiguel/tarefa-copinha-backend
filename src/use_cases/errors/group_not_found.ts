
export class GroupNotFoundError extends Error {
    constructor() {
        super("Não foi encnontrado nenhum grupo com o ID fornecido.")
    }
}