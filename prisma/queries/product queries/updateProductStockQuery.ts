import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductStockQuery(name: string, stock: number) {
  const updatedProduct = await prisma.product.update({
    where: {
      name: name
    },
    data: {
      stock: stock
    }
  });
  return updatedProduct;
}
