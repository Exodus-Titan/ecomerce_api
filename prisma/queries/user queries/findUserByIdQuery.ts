import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUserByIdQuery(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  return user;
}
