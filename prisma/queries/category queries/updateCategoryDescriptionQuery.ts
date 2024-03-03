import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function updateCategoryDescriptionQuery(id: string, description: string) {
  try{
    const category = await prisma.category.update({
      where: {
        id: id
      },
      data: {
        description: description
      }
    });
    return category;
  }catch(error){
    throw Boom.notFound('Category not found');
  }
}
