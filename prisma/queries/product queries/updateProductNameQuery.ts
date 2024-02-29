import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductNameQuery(id: string, newName: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      name: newName
    }
  });
  return updatedProduct;
}
