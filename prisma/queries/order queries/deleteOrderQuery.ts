import { PrismaClient } from "@prisma/client";
import { findOrderById } from "./findOrderByIdQuery";

const prisma = new PrismaClient()

export async function deleteOrderQuery(id: string) {
  const deletedOrder = findOrderById(id);
  await prisma.order.delete({
    where: {
      id: id
    }
  });
  return deletedOrder;
}
