import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateCategoryNameQuery(id: string, newName: string) {
  const category = await prisma.category.update({
    where: {
      id: id
    },
    data: {
      name: newName
    }
  });
  return category;
}
