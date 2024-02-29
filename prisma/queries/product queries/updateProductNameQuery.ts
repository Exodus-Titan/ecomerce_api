import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductNameQuery(oldName: string, newName: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      name: oldName
    },
    data: {
      name: newName
    }
  });
  return updatedProduct;
}
