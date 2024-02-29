import { PrismaClient } from "@prisma/client";
import { CategoryDto } from "../../../dto/categoryDto";

const prisma = new PrismaClient()

export async function createCategoryQuery(categoryDto: CategoryDto) {
  const category = await prisma.category.create({
    data: {
      name: categoryDto.name,
      description: categoryDto.description,
      products: {},
    },
  });
  return category;
}
