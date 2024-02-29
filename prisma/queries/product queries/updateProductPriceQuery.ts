import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductPriceQuery(id: string, price: number) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      price: price
    }
  });
  return updatedProduct;
}
