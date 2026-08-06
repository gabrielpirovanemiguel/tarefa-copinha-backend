import type { User } from "@/@types/prisma/client.js";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByPublicId(publicId: string): Promise<User | null>;
}
