import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findCategoryByIdQuery(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  });
  return category;
}
