import { PrismaClient } from "@prisma/client";
import { OrderDto } from "../../../dto/orderDto";

const prisma = new PrismaClient()

export async function createOrderQuery(orderDto: OrderDto) {
  let price = 0;
  let items = [];
  for (let i = 0; i < orderDto.orderedProducts.length; i++) {
    const product = await prisma.product.findUnique({
      where: {
        id: orderDto.orderedProducts[i].productId
      }
    });
    if (product) {
      price += product.price * orderDto.orderedProducts[i].quantity;
      const orderedProducts = {
        id: product.id,
        quantity: orderDto.orderedProducts[i].quantity
      }
      items.push(orderedProducts);
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
}

