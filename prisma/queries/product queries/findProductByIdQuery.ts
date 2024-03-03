import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function findProductByIdQuery(id: string) {
  try{
    const product = await prisma.product.findUnique({
      where: {
        id: id
      }
    });
    return product;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
}
