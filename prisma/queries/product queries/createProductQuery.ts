import { PrismaClient } from "@prisma/client";
import { ProductDto } from "../../../dto/productDto";
import Boom from '@hapi/boom';
import { findProductByNameQuery } from "./findProductByNameQuery";

const prisma = new PrismaClient()

export async function createProductQuery(ProductDto: ProductDto){
  try{
    const nameCheck = await findProductByNameQuery(ProductDto.name);
    if(!nameCheck){
      const product = await prisma.product.create({
      data: {
        name: ProductDto.name,
        description: ProductDto.description,
        price: ProductDto.price,
        stock: ProductDto.stock,
        category:{
          connect: {id: ProductDto.categoryId}
        },
      }
      });
      return product;
    }else{
      throw Boom.badData('Another product with the same name already exists');
    }
  } catch (error) {
    throw Boom.internal('Error creating product');
  }
}
