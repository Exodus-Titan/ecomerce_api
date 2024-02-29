import { PrismaClient } from "@prisma/client";
import { v1 as uuidv1 } from 'uuid';
import { CategoryDto } from "../../../dto/categoryDto";

const prisma = new PrismaClient()

export async function createCategoryQuery(categoryDto: CategoryDto) {
  const category = await prisma.category.create({
    data: {
      id: uuidv1(),
      name: categoryDto.name,
      description: categoryDto.description,
      products: {},
    },
  });
  return category;
}
