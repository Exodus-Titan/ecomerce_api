import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function findProductsInStockQuery() {
  try{
    const productsInStock = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0
        }
      }
    });
    return productsInStock;
  } catch (error) {
    throw Boom.notFound('No products found in stock');
  }
}
