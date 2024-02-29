import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateCategoryDescriptionQuery(id: string, description: string) {
  const category = await prisma.category.update({
    where: {
      id: id
    },
    data: {
      description: description
    }
  });
  return category;
}
