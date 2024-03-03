import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';
import { findProductByNameQuery } from "./findProductByNameQuery";

const prisma = new PrismaClient()

export async function updateProductNameQuery(id: string, newName: string) {
  try{
    const nameCheck = await findProductByNameQuery(newName);
      if(!nameCheck){
      const updatedProduct = await prisma.product.update({
        where: {
          id: id
        },
        data: {
          name: newName
        }
      });
      return updatedProduct;
  }else{
    throw Boom.badData('Another product with the same name already exists');
  }
  } catch (error) {
    throw Boom.notFound('Product not found');
  }

}
