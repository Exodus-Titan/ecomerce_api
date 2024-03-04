import { ProductDto } from "../dto/productDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import Boom from '@hapi/boom';
import { categoryExists } from "../services/validation Funtions/categoryExists";
import { createProductQuery, deleteProductQuery, findAllProductsQuery, findProductByIdQuery, findProductByNameQuery, findProductsByCategoryQuery, findProductsInStockQuery, findProductsWithoutStockQuery, updateProductCategoryQuery, updateProductDescriptionQuery, updateProductNameQuery, updateProductPriceQuery, updateProductStockQuery } from "../prisma/queries/product queries/productQueriesIndex";
import { StringDto } from "../dto/stringDto";
import { PriceDto } from "../dto/priceDto";
import { StockDto } from "../dto/stockDto";

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

  async getProductById(productId: string){
    const productIdDto = new StringDto(productId);
    const validationResult = await validateData<StringDto>(StringDto, productIdDto);
    if (validationResult.isValid) {
      const data = validationResult.validatedData;
      if (data) {
        const product = await findProductByIdQuery(data.string);
        if (product) {
          return product;
        } else {
          throw Boom.notFound('Product not found');
          }
      }else {
        throw Boom.badData('Id not provided');
      }
    }else{
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

  async getAllProducts(){
    const products = await findAllProductsQuery();
    if (products && products.length > 0) {
      return products;
    } else {
      throw Boom.notFound('No products found');
    }
  }

  async getProductByCategory(categoryId: string){
    const categoryIdDto = new StringDto(categoryId);
    const validationResult = await validateData<StringDto>(StringDto, categoryIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          if(await categoryExists(data.string)){
            const products = await findProductsByCategoryQuery(data.string);
            if (products && products.length > 0) {
              return products;
            } else {
              throw Boom.notFound('No products found');
            }
          }else{
            throw Boom.notFound('Category does not exist');
          }
        }else {
          throw Boom.badData('Category id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }

  async getProductByName(name: string){
    const nameDto = new StringDto(name);
    const validationResult = await validateData(StringDto, nameDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const product = await findProductByNameQuery(data.string);
          if (product) {
            return product;
          } else {
            throw Boom.notFound('Product not found');
          }
        }else {
          throw Boom.badData('Name not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }

  async findProductsInStock(){
    const products = await findProductsInStockQuery();
    if (products && products.length > 0) {
      return products;
    } else {
      throw Boom.notFound('No products found in stock');
    }
  }

  async findProductsWithoutStock(){
    const products = await findProductsWithoutStockQuery();
    if (products && products.length > 0) {
      return products;
    } else {
      throw Boom.notFound('No products found without stock');
    }
  }

  async updateProductCategory(productId: string, categoryId: string){
    const productIdDto = new StringDto(productId);
    const categoryIdDto = new StringDto(categoryId);
    const validationProductId = await validateData<StringDto>(StringDto, productIdDto);
    const validationCategoryId = await validateData<StringDto>(StringDto, categoryIdDto);
    if (validationProductId.isValid) {
      const validProductId = validationProductId.validatedData;
      if (validProductId) {
        if (validationCategoryId.isValid) {
          const validCategotyId = validationCategoryId.validatedData;
          if (validCategotyId) {
            if(await categoryExists(validCategotyId.string)){
              const product = await updateProductCategoryQuery(validProductId.string, validCategotyId.string);
              if (product) {
                return product;
              }else {
                throw Boom.notFound('Product not found');
              }
            }else{
              throw Boom.notFound('Category does not exist');
            }
          }else{
            throw Boom.badData('Category id not provided');
          }
        }else{
          throw Boom.badData(validationCategoryId.errors?.[0]);
        }
      }else{
        throw Boom.badData('Product id not provided');
      }
    }else{
      throw Boom.badData(validationProductId.errors?.[0]);
    }
  }

  async updateProductDescription(productId: string, description: string){
    const productIdDto = new StringDto(productId);
    const descriptionDto = new StringDto(description);
    const validationProductId = await validateData<StringDto>(StringDto, productIdDto);
    const validationDescription = await validateData<StringDto>(StringDto, descriptionDto);
    if (validationProductId.isValid) {
      const validProductId = validationProductId.validatedData;
      if (validProductId) {
        if (validationDescription.isValid) {
          const validDescription = validationDescription.validatedData;
          if (validDescription) {
            const product = await updateProductDescriptionQuery(validProductId.string, validDescription.string);
            if (product) {
              return product;
            } else {
              throw Boom.notFound('Product not found');
            }
          }else{
            throw Boom.badData('Description not provided');
          }
        }else{
          throw Boom.badData(validationDescription.errors?.[0]);
        }
      }else{
        throw Boom.badData('Product id not provided');
       }
    }else{
      throw Boom.badData(validationProductId.errors?.[0]);
    }
  }

  async updateProductName(productId: string, name: string){
    const productIdDto = new StringDto(productId);
    const nameDto = new StringDto(name);
    const validationProductId = await validateData<StringDto>(StringDto, productIdDto);
    const validationName = await validateData<StringDto>(StringDto, nameDto);
    if (validationProductId.isValid) {
      const validProductId = validationProductId.validatedData;
      if (validProductId) {
        if (validationName.isValid) {
          const validName = validationName.validatedData;
          if (validName) {
            const product = await updateProductNameQuery(validProductId.string, validName.string);
            if (product) {
              return product;
            } else {
              throw Boom.notFound('Product not found');
            }
          }else{
            throw Boom.badData('Name not provided');
          }
        }else{
          throw Boom.badData(validationName.errors?.[0]);
        }
      }else{
        throw Boom.badData('Product id not provided');
      }
    }else{
      throw Boom.badData(validationProductId.errors?.[0]);
    }
  }

  async updateProductPrice(productId: string, price: number){
    const productIdDto = new StringDto(productId);
    const priceDto = new PriceDto(price);
    const validationProductId = await validateData<StringDto>(StringDto, productIdDto);
    const validationPrice = await validateData<PriceDto>(PriceDto, priceDto);
    if (validationProductId.isValid) {
      const validProductId = validationProductId.validatedData;
      if (validProductId) {
        if (validationPrice.isValid) {
          const validPrice = validationPrice.validatedData;
          if (validPrice) {
            const product = await updateProductPriceQuery(validProductId.string, validPrice.number);
            if (product) {
              return product;
            } else {
              throw Boom.notFound('Product not found');
            }
          }else{
            throw Boom.badData('Price not provided');
          }
        }else{
          throw Boom.badData(validationPrice.errors?.[0]);
        }
      }else{
        throw Boom.badData('Product id not provided');
      }
    }else{
      throw Boom.badData(validationProductId.errors?.[0]);
    }
  }

  async updateProductStock(productId: string, stock: number){
    const productIdDto = new StringDto(productId);
    const stockDto = new StockDto(stock);
    const validationProductId = await validateData<StringDto>(StringDto, productIdDto);
    const validationStock = await validateData<StockDto>(StockDto, stockDto);
    if (validationProductId.isValid) {
      const validProductId = validationProductId.validatedData;
      if (validProductId) {
        if (validationStock.isValid) {
          const validStock = validationStock.validatedData;
          if (validStock) {
            const product = await updateProductStockQuery(validProductId.string, validStock.number);
            if (product) {
              return product;
            } else {
              throw Boom.notFound('Product not found');
            }
          }else{
            throw Boom.badData('Stock not provided');
          }
        }else{
          throw Boom.badData(validationStock.errors?.[0]);
        }
        }else{
          throw Boom.badData('Product id not provided');
        }
    }else{
      throw Boom.badData(validationProductId.errors?.[0]);
    }
  }

  async deleteProduct(productId: string){
    const productIdDto = new StringDto(productId);
    const validationResult = await validateData<StringDto>(StringDto, productIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const product = await deleteProductQuery(data.string);
          if (product) {
            return product;
          } else {
            throw Boom.notFound('Product not found');
          }
        }else {
          throw Boom.badData('Product id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }
}
