import { PrismaClient } from "@prisma/client";
import { ProductDto } from "../../../dto/productDto";

const prisma = new PrismaClient()

export async function createProductQuery(ProductDto: ProductDto){
  const product = await prisma.product.create({
    data: {
      name: ProductDto.name,
      description: ProductDto.description,
      price: ProductDto.price,
      stock: ProductDto.stock,
      categoryId: ProductDto.categoryId
    }
  });
  return product;
}
