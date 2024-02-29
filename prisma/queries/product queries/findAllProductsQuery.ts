import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findAllProductsQuery(){
  const products = await prisma.product.findMany();
  return products;
}
