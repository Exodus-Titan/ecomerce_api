import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function findCategoryByNameQuery(name: string) {
  try{
    const category = await prisma.category.findUnique({
      where: {
        name: name
      }
    });
    return category;
  }catch(error){
    throw Boom.notFound('Category not found');
  }
}
