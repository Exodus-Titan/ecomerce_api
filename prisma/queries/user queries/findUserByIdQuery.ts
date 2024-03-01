import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUserByIdQuery(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    select:{
      id: true,
      email: true,
      name: true,
      role: true
    }
  });
  return user;
}
