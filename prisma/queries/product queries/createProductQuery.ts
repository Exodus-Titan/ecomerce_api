import { PrismaClient } from "@prisma/client";
import { ProductDto } from "../../../dto/productDto";
import { v1 as uuidv1 } from 'uuid';

const prisma = new PrismaClient()

export async function createProductQuery(ProductDto: ProductDto){
  const product = await prisma.product.create({
    data: {
      id: uuidv1(),
      name: ProductDto.name,
      description: ProductDto.description,
      price: ProductDto.price,
      stock: ProductDto.stock,
      categoryId: ProductDto.categoryId
    }
  });
  return product;
}
