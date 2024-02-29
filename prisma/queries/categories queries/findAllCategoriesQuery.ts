import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findAllCategoriesQuery() {
  const categories = await prisma.category.findMany();
  return categories;
}
