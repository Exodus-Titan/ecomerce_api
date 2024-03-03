import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function findAllUserOrdersQuery(id:string) {
  try{
    const orders = await prisma.order.findMany({
      where: {
        User: {
          id: id
        }
      }
    });
    return orders;
  }catch(error){
    throw Boom.notFound("Orders not found");
  }

}
