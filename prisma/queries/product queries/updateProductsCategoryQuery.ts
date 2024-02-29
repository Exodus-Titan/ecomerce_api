import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductsCategoryQuery(name: string, categoryId: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      name: name
    },
    data: {
      category:{connect: {id: categoryId}}
    }
  });
  return updatedProduct;
};
