import { PrismaClient } from "@prisma/client";
import { CategoryDto } from "../../../dto/categoryDto";
import Boom from "@hapi/boom";
import { findCategoryByNameQuery } from "./findCategoryByNameQuery";

const prisma = new PrismaClient()

export async function createCategoryQuery(categoryDto: CategoryDto) {
  try{
    const nameCheck = await findCategoryByNameQuery(categoryDto.name);
    if(!nameCheck){
    const category = await prisma.category.create({
      data: {
        name: categoryDto.name,
        description: categoryDto.description,
        products: {},
      },
    });
    return category;
  }else{
    throw Boom.badData('Another category with the same name already exists');
  }
  }catch(error){
    throw Boom.internal('Error creating category');
  }
}
