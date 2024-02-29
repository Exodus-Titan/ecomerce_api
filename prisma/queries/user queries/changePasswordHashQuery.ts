import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function changePasswordHashQuery(email: string, passwordHash: string) {
  const user = await prisma.user.update({
    where: {
      email: email
    },
    data: {
      passwordHash: passwordHash
    }
  })
  return user;
}
