import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
const prisma = new PrismaClient()

export async function findAllCategoriesQuery() {
  try{
    const categories = await prisma.category.findMany();
    return categories;
  }catch(error){
    throw Boom.notFound('No categories found');
  }
  }
