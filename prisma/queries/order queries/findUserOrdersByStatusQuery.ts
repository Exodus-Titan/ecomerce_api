import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient();

export async function findUserOrdersByStatusQuery(userId: string, status: string){
  try{
    const orders =  await prisma.order.findMany({
      where: {
        AND: [{
          userId:userId,
        },{
        status: status,
        }
        ]
      },
    });
    return orders;
  }catch(error){
    throw Boom.notFound("Orders not found");
  }
};
