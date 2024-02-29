import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductDescription(id: string, description: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      description: description
    }
  });
  return updatedProduct;
}
