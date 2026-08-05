
export class GroupAlreadyExistsError extends Error {
    constructor(message?: string) {
        super(message || "Já existe um grupo com esse nome.")
    }
}