import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findCategoryByNameQuery(name: string) {
  const category = await prisma.category.findUnique({
    where: {
      name: name
    }
  });
  return category;
}
