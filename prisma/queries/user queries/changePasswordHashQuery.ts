import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function changePasswordHashQuery(id: string, passwordHash: string) {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      passwordHash: passwordHash
    }
  })
  return user;
}
