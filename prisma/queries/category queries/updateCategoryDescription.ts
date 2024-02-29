import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function updateCategoryDescriptionQuery(name: string, description: string) {
  const category = await prisma.category.update({
    where: {
      name: name
    },
    data: {
      description: description
    }
  });
  return category;
}
