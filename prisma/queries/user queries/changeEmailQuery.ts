import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function changeEmailQuery(oldEmail: string, newEmail: string) {
  const user = await prisma.user.update({
    where: {
      email: oldEmail
    },
    data: {
      email: newEmail
    }
  })
  return user;
}
