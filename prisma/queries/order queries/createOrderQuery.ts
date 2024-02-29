import { PrismaClient } from "@prisma/client";
import { OrderDto } from "../../../dto/orderDto";

const prisma = new PrismaClient()

export async function createOrderQuery(orderDto: OrderDto) {
  let price = 0;
  for (let i = 0; i < orderDto.productsIds.length; i++) {
    const product = await prisma.product.findUnique({
      where: {
        id: orderDto.productsIds[i]
      }
    });
    if (product) {
      price += product.price;
    }
    else {
      throw new Error("Product not found");
    }
  }
  const order = await prisma.order.create({
    data: {
      total: price,
      User: {
        connect: {
          id: orderDto.userId
        }
      },
      productsIds: orderDto.productsIds
    },
  });
  return order;
}

