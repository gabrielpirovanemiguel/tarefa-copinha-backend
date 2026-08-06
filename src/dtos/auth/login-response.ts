import type { USER_ROLE } from "@/@types/prisma/enums.js";

export interface LoginResponseDTO {
  token: string;

  user: {
    publicId: string;
    name: string;
    username: string;
    email: string;
    role: USER_ROLE;
  };
}
