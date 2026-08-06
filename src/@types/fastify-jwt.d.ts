import "@fastify/jwt";
import type { USER_ROLE } from "@/@types/prisma/enums.js";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      role: USER_ROLE;
    };

    user: {
      sub: string;
      role: USER_ROLE;
    };
  }
}
