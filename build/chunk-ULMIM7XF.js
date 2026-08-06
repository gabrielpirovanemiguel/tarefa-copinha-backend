// src/env/index.ts
import "dotenv/config";
import { z } from "zod";
var envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  // Mínimo poderia ser 1, mas é melhor ser 1024 para a porta não ser protegida
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  HASH_SALT_ROUNDS: z.coerce.number().default(12)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables.", _env.error);
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

export {
  env
};
//# sourceMappingURL=chunk-ULMIM7XF.js.map