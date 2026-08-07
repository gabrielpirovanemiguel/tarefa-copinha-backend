import type { FastifyInstance } from "fastify";
import { createStadium } from "./create_stadium_controller.js";


export function adminStadiumRoutes(app: FastifyInstance) {
    app.post('/', createStadium)
} 