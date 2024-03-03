import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function updateProductCategoryQuery(id: string, categoryId: string) {
  try{
    const updatedProduct = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        category:{connect: {id: categoryId}}
      }
    });
    return updatedProduct;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
};
