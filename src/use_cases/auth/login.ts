import bcrypt from "bcryptjs";
import { app } from "@/app.js";
import type { UserRepository } from "@/repositories/user-repository.js";
import type { JwtService } from "@/services/jwt/jwt-service.js";

interface LoginRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: LoginRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new Error("Invalid credentials.");
    }

    const token = await this.jwtService.sign({
      sub: user.publicId,
      role: user.role,
    });

    return {
      token,
      user: {
        publicId: user.publicId,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
