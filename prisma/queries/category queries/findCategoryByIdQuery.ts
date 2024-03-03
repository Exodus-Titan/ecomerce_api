import  Boom  from "@hapi/boom";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findCategoryByIdQuery(id: string) {
  try{
    const category = await prisma.category.findUnique({
      where: {
        id: id
      }
    });
    return category;
  }catch(error){
    throw Boom.notFound('Category not found');
  }
}
