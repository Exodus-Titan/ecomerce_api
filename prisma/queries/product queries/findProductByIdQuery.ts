import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findProductByIdQuery(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: id
    }
  });
  return product;
}
