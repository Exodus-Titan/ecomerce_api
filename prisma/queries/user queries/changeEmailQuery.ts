import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function changeEmailQuery(id: string, newEmail: string) {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      email: newEmail
    }
  })
  return user;
}
