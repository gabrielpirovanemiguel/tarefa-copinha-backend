import {
  prisma
} from "./chunk-EDHVKHAN.js";

// src/repositories/prisma-user-repository.ts
var PrismaUserRepository = class {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  }
  async findByPublicId(publicId) {
    return prisma.user.findUnique({
      where: {
        publicId
      }
    });
  }
};

export {
  PrismaUserRepository
};
//# sourceMappingURL=chunk-PHVD5ASE.js.map