// src/use_cases/auth/login.ts
import bcrypt from "bcryptjs";
var LoginUseCase = class {
  constructor(usersRepository, jwtService) {
    this.usersRepository = usersRepository;
    this.jwtService = jwtService;
  }
  usersRepository;
  jwtService;
  async execute({ email, password }) {
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
      role: user.role
    });
    return {
      token,
      user: {
        publicId: user.publicId,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }
};

export {
  LoginUseCase
};
//# sourceMappingURL=chunk-3VVJZ6TC.js.map