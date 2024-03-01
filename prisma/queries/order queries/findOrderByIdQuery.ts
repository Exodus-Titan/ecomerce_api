import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findOrderByIdQuery(id: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: id
    }
  });
  return order;
}
