import { PrismaClient } from "@prisma/client";
import { OrderDto } from "../../../dto/orderDto";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function createOrderQuery(orderDto: OrderDto) {
  try{
    let price = 0;
    let items = [];
    for (let i = 0; i < orderDto.orderedProducts.length; i++) {
      const product = await prisma.product.findUnique({
        where: {
          id: orderDto.orderedProducts[i].productId
        }
      });
      if (product) {
        if(product.stock >= orderDto.orderedProducts[i].quantity) {
          price += product.price * orderDto.orderedProducts[i].quantity;
          const orderedProducts = {
            id: product.id,
            quantity: orderDto.orderedProducts[i].quantity
          }
          items.push(orderedProducts);
        }else{
          throw Boom.badRequest("Not enough stock on product: " + product.name);
        }
      }
      else {
        throw Boom.notFound("Product not found");
      }
    }
    for(let i=0; i<items.length; i++){
      await prisma.product.update({
        where: {
          id: items[i].id
        },
        data: {
          stock: {
            decrement: items[i].quantity
          }
        }
      });
    };
    const order = await prisma.order.create({
      data: {
        total: price,
        User: {
          connect: {
            id: orderDto.userId
          }
        },
        products: {
          set: items.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        },
        status: "pending"
      },
    });
    return order;
  } catch (error) {
    throw Boom.internal("Error creating order");
  }
}

