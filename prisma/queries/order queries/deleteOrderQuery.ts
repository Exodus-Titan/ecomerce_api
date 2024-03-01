import { PrismaClient } from "@prisma/client";
import { findOrderByIdQuery } from "./findOrderByIdQuery";

const prisma = new PrismaClient()

export async function deleteOrderQuery(id: string) {
  const deletedOrder = findOrderByIdQuery(id);
  await prisma.order.delete({
    where: {
      id: id
    }
  });
  return deletedOrder;
}
