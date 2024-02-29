import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductDescription(name: string, description: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      name: name
    },
    data: {
      description: description
    }
  });
  return updatedProduct;
}
