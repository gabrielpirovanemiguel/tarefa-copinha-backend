import type { FastifyInstance } from "fastify";
import { listTeamsByGroup } from "./list-by-group.controller.js";


export async function userTeamRoutes(app: FastifyInstance){
    app.get('/group_filter', listTeamsByGroup)
}