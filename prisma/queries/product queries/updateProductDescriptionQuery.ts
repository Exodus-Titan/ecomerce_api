import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function updateProductDescriptionQuery(id: string, description: string) {
  try{
    const updatedProduct = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        description: description
      }
    });
    return updatedProduct;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
}
