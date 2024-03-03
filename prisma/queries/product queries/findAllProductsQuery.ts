import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';

const prisma = new PrismaClient()

export async function findAllProductsQuery(){
  try{
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw Boom.notFound('No products found');
  }
}
