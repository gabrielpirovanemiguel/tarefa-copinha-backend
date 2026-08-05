import { prisma } from '@/libs/prisma.js'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { hash } from 'bcryptjs'

export async function seed() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      id: 1,
      publicId: '0197f9cb-e9dd-72f2-8bea-863124fbec4c',
      name: 'Admin User',
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: await hash('1234567890', 10),
      role: USER_ROLE.admin,
    },
  })

  await prisma.admin.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
    },
  })

  console.log('Seeding completed successfully.')
}

seed()
  .then(() => {
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error during seeding:', error)
    prisma.$disconnect()
    process.exit(1)
  })