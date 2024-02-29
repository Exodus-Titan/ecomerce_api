import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findAllOrdersQuery() {
  const orders = await prisma.order.findMany({
  });
  return orders;
}
