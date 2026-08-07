import { app } from "@/app.js";
import type { JwtPayload, JwtService } from "./jwt-service.js";

export class FastifyJwtService implements JwtService {
  async sign(payload: JwtPayload) {
    return app.jwt.sign(payload);
  }
}
