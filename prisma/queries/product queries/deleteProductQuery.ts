import { PrismaClient } from "@prisma/client";
import { findProductByIdQuery } from "./findProductByIdQuery";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function deleteProductQuery(id: string) {
  try{
    const product = findProductByIdQuery(id);
    await prisma.product.delete({
      where: {
        id: id
      }
    });
    return product;
  } catch (error) {
    throw Boom.notFound('Product not found');
  }
}
