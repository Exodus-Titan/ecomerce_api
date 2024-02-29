import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUserByEmailQuery(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    },
    select:{
      id: true,
      email: true,
      name: true,
      role: true
    }
  });
}
