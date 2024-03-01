import { ProductDto } from "../dto/productDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import { createProductQuery, deleteProductQuery, findAllProductsQuery, findProductByIdQuery, findProductByNameQuery, findProductsByCategoryQuery, findProductsInStockQuery, findProductsWithoutStockQuery, updateProductCategoryQuery, updateProductDescriptionQuery, updateProductNameQuery, updateProductPriceQuery, updateProductStockQuery } from "../prisma/queries/product queries/productQueriesIndex";

export class ProductServices{
  async createProduct(productDto: ProductDto){
    try{
      const validationResult = await validateData<ProductDto>(ProductDto, productDto);
      if (validationResult.isValid) {
        const product = validationResult.validatedData;
        const validProduct = await createProductQuery(product as ProductDto);
        return validProduct;
      } else {
        throw new Error(validationResult.errors?.[0]);
      }
    } catch (error) {
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getProductById(id: string){
    try{
      const product = await findProductByIdQuery(id);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getAllProducts(){
    try{
      const products = await findAllProductsQuery();
      if (products) {
        return products;
      } else {
        throw new Error('No products found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getProductByCategory(category: string){
    try{
      const products = await findProductsByCategoryQuery(category);
      if (products) {
        return products;
      } else {
        throw new Error('No products found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getProductByName(name: string){
    try{
      const product = await findProductByNameQuery(name);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async findProductsInStock(){
    try{
      const products = await findProductsInStockQuery();
      if (products) {
        return products;
      } else {
        throw new Error('No products found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async findProductsWithoutStock(){
    try{
      const products = await findProductsWithoutStockQuery();
      if (products) {
        return products;
      } else {
        throw new Error('No products found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateProductCategory(productId: string, categoryId: string){
    try{
      const product = await updateProductCategoryQuery(productId, categoryId);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateProductDescription(productId: string, description: string){
    try{
      const product = await updateProductDescriptionQuery(productId, description);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateProductName(productId: string, name: string){
    try{
      const product = await updateProductNameQuery(productId, name);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateProductPrice(productId: string, price: number){
    try{
      const product = await updateProductPriceQuery(productId, price);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateProductStock(productId: string, stock: number){
    try{
      const product = await updateProductStockQuery(productId, stock);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async deleteProduct(productId: string){
    try{
      const product = await deleteProductQuery(productId);
      if (product) {
      } else {
        throw new Error('Product not found');
      }
    }catch(error){

      console.log(error);//enviar un mensaje con el error
    }
  }
}
