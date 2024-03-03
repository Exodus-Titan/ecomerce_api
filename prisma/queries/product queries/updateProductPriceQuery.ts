import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function updateProductPriceQuery(id: string, price: number) {
  try{
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      price: price
    }
  });
  return updatedProduct;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
}
