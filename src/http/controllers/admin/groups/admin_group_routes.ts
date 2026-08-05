import type { FastifyInstance } from "fastify";
import { createGroup } from "./create_group_controler.js";


export function adminGroupRoutes(app: FastifyInstance) {
    app.post('/', createGroup)
} 