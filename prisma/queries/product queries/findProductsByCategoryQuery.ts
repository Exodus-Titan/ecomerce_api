import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findProductsByCategory(categoryId: string) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId
    }
  });
  return products;
}
