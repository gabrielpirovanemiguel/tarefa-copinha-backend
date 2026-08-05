import type { FastifyInstance } from "fastify";
import { adminRoutes } from "./controllers/admin/admin_routes.js";


export async function appRoutes(app: FastifyInstance) {
    app.register(adminRoutes, { prefix: '/admin' })
}