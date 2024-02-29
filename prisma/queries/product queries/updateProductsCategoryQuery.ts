import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateProductsCategoryQuery(id: string, categoryId: string) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      category:{connect: {id: categoryId}}
    }
  });
  return updatedProduct;
};
