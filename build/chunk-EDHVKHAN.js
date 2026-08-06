import {
  PrismaClient
} from "./chunk-VBUQG7EC.js";
import {
  env
} from "./chunk-ULMIM7XF.js";

// src/libs/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

export {
  prisma
};
//# sourceMappingURL=chunk-EDHVKHAN.js.map