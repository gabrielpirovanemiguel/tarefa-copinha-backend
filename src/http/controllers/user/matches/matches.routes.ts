import { getMatchDetails } from "./get-details.controller.js";
import type { FastifyInstance } from "fastify";
import { listMatchesByGroup } from "./list-by-group.controller.js";
import { listMatchesByStatus } from "./list-by-status.controller.js";

export async function userMatchesRoutes(app: FastifyInstance) {
    app.get('/:publicId', getMatchDetails)
    app.get('/group_filter', listMatchesByGroup)
    app.get('/status_filter', listMatchesByStatus)
}