import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function updateProductStockQuery(id: string, stock: number) {
  try{
    const updatedProduct = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        stock: stock
      }
    });
    return updatedProduct;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
}
