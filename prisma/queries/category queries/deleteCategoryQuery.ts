import { PrismaClient } from "@prisma/client";
import { findCategoryByIdQuery } from "./findCategoryByIdQuery";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function deleteCategoryQuery(id: string) {
  try{
    const deletedCategory = await findCategoryByIdQuery(id);
    await prisma.category.delete({
      where: {
        id: id
      }
    });
    return deletedCategory;
  }catch(error){
    throw Boom.notFound('Category not found');
  }
}
