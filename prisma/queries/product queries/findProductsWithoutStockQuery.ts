import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function findProductsWithoutStockQuery() {
  try{
    const productsWithoutStock = await prisma.product.findMany({
      where: {
        stock: 0
      }
    });
    return productsWithoutStock;
  } catch (error) {
    throw Boom.notFound('No products found without stock');
  }
}
