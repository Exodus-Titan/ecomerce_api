import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findProductByNameQuery(name: string) {
  const product = await prisma.product.findUnique({
    where: {
      name: name
    }
  });
  return product;
}
