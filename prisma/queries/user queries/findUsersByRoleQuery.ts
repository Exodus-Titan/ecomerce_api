import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUsersByRoleQuery(role: string) {
  return await prisma.user.findMany({
    where: {
      role: role
    },
    select:{
      id: true,
      email: true,
      name: true,
      role: true
    }
  });
}
