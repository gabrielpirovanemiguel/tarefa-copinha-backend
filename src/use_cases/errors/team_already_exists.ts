
export class TeamAlreadyExistsError extends Error {
    constructor(message?: string) {
        super(message || "Esse time já existe.")
    }
}