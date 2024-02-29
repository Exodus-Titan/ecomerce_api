import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateCategoryNameQuery(oldName: string, newName: string) {
  const category = await prisma.category.update({
    where: {
      name: oldName
    },
    data: {
      name: newName
    }
  });
  return category;
}
