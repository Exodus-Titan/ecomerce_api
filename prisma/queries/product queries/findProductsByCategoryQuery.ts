import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function findProductsByCategoryQuery(categoryId: string) {
  try{
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      }
    });
    return products;
  } catch (error) {
    throw Boom.notFound('No products found in the categoty');
  }
}
