import { PrismaClient } from "@prisma/client";
import { findCategoryByNameQuery } from "./findCategoryByNameQuery";

const prisma = new PrismaClient()

export async function deleteCategoryQuery(name: string) {
  const deletedCategory = await findCategoryByNameQuery(name);
  await prisma.category.delete({
    where: {
      name: name
    }
  });
  return deletedCategory;
}
