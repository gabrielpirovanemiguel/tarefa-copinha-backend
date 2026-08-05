
export class GroupAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um grupo com esse nome.")
    }
}