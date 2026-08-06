import {
  prisma
} from "../chunk-EDHVKHAN.js";
import "../chunk-VBUQG7EC.js";
import "../chunk-PC5GDWB4.js";
import "../chunk-FCK2LHWZ.js";
import "../chunk-5IYCNSUE.js";
import "../chunk-ULMIM7XF.js";
import "../chunk-PZ5AY32C.js";

// src/scripts/create-admin.ts
import bcrypt from "bcryptjs";
async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);
  const user = await prisma.user.create({
    data: {
      name: "Administrador",
      username: "admin",
      email: "admin@copinha.com",
      passwordHash,
      role: "admin"
    }
  });
  console.log(user);
}
main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
//# sourceMappingURL=create-admin.js.map