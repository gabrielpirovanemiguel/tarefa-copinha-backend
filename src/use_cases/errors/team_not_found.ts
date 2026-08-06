
export class TeamNotFoundError extends Error {
    constructor(message?: string) {
        super(message ||"Não foi encontrado nenhum time com o ID fornecido.")
    }
}