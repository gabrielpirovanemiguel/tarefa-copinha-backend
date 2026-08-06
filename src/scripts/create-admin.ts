import bcrypt from "bcryptjs";
import { prisma } from "../libs/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Administrador",
      username: "admin",
      email: "admin@copinha.com",
      passwordHash,
      role: "admin",
    },
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
