import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductPriceQuery(name: string, price: number) {
  const updatedProduct = await prisma.product.update({
    where: {
      name: name
    },
    data: {
      price: price
    }
  });
  return updatedProduct;
}
