import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findAllUsersQuery() {
  return await prisma.user.findMany({
    select:{
      id: true,
      email: true,
      name: true,
      role: true
    }
  });
}
