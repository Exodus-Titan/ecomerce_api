import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
import { findOrderByIdQuery } from "./findOrderByIdQuery";

const prisma = new PrismaClient()

export async function cancelOrderQuery(orderId: string) {
  try{
    const order = await findOrderByIdQuery(orderId);
    if(order){
        if(order?.status !== "cancelled"){
        await prisma.order.update({
          where: {
            id: orderId
          },
          data: {
            status: "cancelled"
          }
        });
        for(let i = 0; i < order?.products.length; i++){
          await prisma.product.update({
            where: {
              id: order.products[i].productId
            },
            data: {
              stock: {
                increment: order.products[i].quantity
              }
            }

          });
        }
      }else{
        throw Boom.badRequest("Order already cancelled");
      }
      return order;
    }else{
      throw Boom.notFound("Order not found");
    }
  }catch(error){
    throw Boom.internal("Error cancelling order");
  }

}
