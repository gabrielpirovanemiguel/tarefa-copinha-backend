import type { USER_ROLE } from "@/@types/prisma/enums.js";

export interface JwtPayload {
  sub: string;
  role: USER_ROLE;
}

export interface JwtService {
  sign(payload: JwtPayload): Promise<string>;
}
