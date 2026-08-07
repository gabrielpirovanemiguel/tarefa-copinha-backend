
export class SameTeamError extends Error {
    constructor() {
        super("O time A e o time B não podem ser o mesmo time.")
    }
}
