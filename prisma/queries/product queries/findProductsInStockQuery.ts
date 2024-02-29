import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findProductsInStockQuery() {
  const productsInStock = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0
      }
    }
  });
  return productsInStock;
}
