import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function findAllOrdersQuery() {
  try{
    const orders = await prisma.order.findMany({
    });
    return orders;
  }catch (error) {
    throw Boom.notFound("No orders found");
  }
}
