import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductStockQuery(id: string, stock: number) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      stock: stock
    }
  });
  return updatedProduct;
}
