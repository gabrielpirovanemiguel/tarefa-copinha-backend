export class NewsNotFoundError extends Error {
    constructor() {
        super("Não foi encontrado nenhuma notícia com o ID fornecido.")
    }
}