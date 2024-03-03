import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient();

export const updateOrderStatusQuery = async (id: string, status: string) => {
  try{
    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return order;
  }catch(error){
    throw Boom.notFound("Order not found");
  }
};
