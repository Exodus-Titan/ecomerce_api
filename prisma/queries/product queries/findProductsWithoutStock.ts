import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findProductsWithoutStockQuery() {
  const productsWithoutStock = await prisma.product.findMany({
    where: {
      stock: 0
    }
  });
  return productsWithoutStock;
}
