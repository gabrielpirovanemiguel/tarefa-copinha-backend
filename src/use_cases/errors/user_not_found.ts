export class UserNotFoundError extends Error {
    constructor() {
        super("Não foi encontrado nenhum usuário com o ID fornecido.")
    }
}