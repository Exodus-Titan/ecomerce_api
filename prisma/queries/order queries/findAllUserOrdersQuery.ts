import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findAllUserOrdersQuery(id:string) {
  const orders = await prisma.order.findMany({
    where: {
      User: {
        id: id
      }
    }
  });
  return orders;

}
