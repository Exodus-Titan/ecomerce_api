import { PrismaClient } from "@prisma/client";
import { findOrderByIdQuery } from "./findOrderByIdQuery";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function deleteOrderQuery(id: string) {
  try{
    const deletedOrder = findOrderByIdQuery(id);
    await prisma.order.delete({
      where: {
        id: id
      }
    });
    return deletedOrder;
  }catch (error) {
    throw Boom.notFound("Order not found");
  }
}
