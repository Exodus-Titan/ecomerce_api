import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
import { findProductByNameQuery } from "../product queries/findProductByNameQuery";
const prisma = new PrismaClient()

export async function updateCategoryNameQuery(id: string, newName: string) {
  try{
    const nameCheck = await findProductByNameQuery(newName);
    if(!nameCheck){
    const category = await prisma.category.update({
      where: {
        id: id
      },
      data: {
        name: newName
      }
    });
    return category;
  }else{
    throw Boom.badData('Another category with the same name already exists');
  }
  }catch(error){
    throw Boom.notFound('Category not found');
  }
}
