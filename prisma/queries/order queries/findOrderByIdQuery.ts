import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function findOrderByIdQuery(id: string) {
  try{
  const order = await prisma.order.findUnique({
    where: {
      id: id
    }
  });
  return order;
  }catch (error) {
    throw Boom.notFound("Order not found");
  }

}
