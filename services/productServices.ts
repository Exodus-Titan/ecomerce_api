import { ProductDto } from "../dto/productDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import Boom from '@hapi/boom';
import { categoryExists } from "../services/validation Funtions/categoryExists";
import { createProductQuery, deleteProductQuery, findAllProductsQuery, findProductByIdQuery, findProductByNameQuery, findProductsByCategoryQuery, findProductsInStockQuery, findProductsWithoutStockQuery, updateProductCategoryQuery, updateProductDescriptionQuery, updateProductNameQuery, updateProductPriceQuery, updateProductStockQuery } from "../prisma/queries/product queries/productQueriesIndex";

export class ProductServices{
  async createProduct(productDto: ProductDto){
    const validationResult = await validateData<ProductDto>(ProductDto, productDto);
    if (validationResult.isValid) {
      if(await categoryExists(productDto.categoryId)){
        const product = validationResult.validatedData;
        const validProduct = await createProductQuery(product as ProductDto);
        return validProduct;
      }else{
        throw Boom.badData('Category does not exist');
      }
    } else {
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

  async getProductById(id: string){
    const product = await findProductByIdQuery(id);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async getAllProducts(){
    const products = await findAllProductsQuery();
    if (products) {
      return products;
    } else {
      throw Boom.notFound('No products found');
    }
  }

  async getProductByCategory(category: string){
    if(await categoryExists(category)){
      const products = await findProductsByCategoryQuery(category);
      if (products) {
        return products;
      } else {
        throw Boom.notFound('No products found');
      }
    }else{
      throw Boom.notFound('Category does not exist');
    }
  }

  async getProductByName(name: string){
    const product = await findProductByNameQuery(name);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async findProductsInStock(){
    const products = await findProductsInStockQuery();
    if (products) {
      return products;
    } else {
      throw Boom.notFound('No products found');
    }
  }

  async findProductsWithoutStock(){
    const products = await findProductsWithoutStockQuery();
    if (products) {
      return products;
    } else {
      throw Boom.notFound('No products found');
    }
  }

  async updateProductCategory(productId: string, categoryId: string){
    if(await categoryExists(categoryId)){
      const product = await updateProductCategoryQuery(productId, categoryId);
      if (product) {
        return product;
      } else {
        throw Boom.notFound('Product not found');
    }
    }else{
      throw Boom.notFound('Category does not exist');
    }
  }

  async updateProductDescription(productId: string, description: string){
    const product = await updateProductDescriptionQuery(productId, description);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async updateProductName(productId: string, name: string){
    const product = await updateProductNameQuery(productId, name);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async updateProductPrice(productId: string, price: number){
    const product = await updateProductPriceQuery(productId, price);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async updateProductStock(productId: string, stock: number){
    const product = await updateProductStockQuery(productId, stock);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }

  async deleteProduct(productId: string){
    const product = await deleteProductQuery(productId);
    if (product) {
      return product;
    } else {
      throw Boom.notFound('Product not found');
    }
  }
}
