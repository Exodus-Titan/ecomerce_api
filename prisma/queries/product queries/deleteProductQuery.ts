import { PrismaClient } from "@prisma/client";
import { findProductByNameQuery } from "./findProductByNameQuery";

const prisma = new PrismaClient()

export async function deleteProductQuery(name: string) {
  const product = findProductByNameQuery(name);
  await prisma.product.delete({
    where: {
      name: name
    }
  });
  return product;
}
