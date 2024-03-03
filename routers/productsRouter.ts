import express from "express";
import Boom from '@hapi/boom';
import { ProductServices } from "../services/productServices";
import { ProductDto } from "../dto/productDto";
import passport from "passport";
import { dataPagination } from "../middelware/pagination";

const productsService = new ProductServices();

export const productsRouter = express.Router();
//Falta verificacion de permisos

productsRouter.get("/", async (req, res, next) => {
    try{
      const products = await productsService.getAllProducts();
      if(!req.query.page || !req.query.pageSize){
        res.send(products);
      }else{
        const paginatedProducts = dataPagination(req.query.page as string, req.query.pageSize as string, products)
        res.send(paginatedProducts);
      }
    }catch(error){
      next(error);
    }
});


productsRouter.get("/name", async (req, res, next) => {
  try{
    const name = req.body.name;
    const product = await productsService.getProductByName(name);
    res.send(product);
  }catch(error){
    next(error);
  }
});

productsRouter.get("/category/:categoryId", async (req, res, next) => {
  try{
    const categoryId = req.params.categoryId;
    const products = await productsService.getProductByCategory(categoryId);
    if(!req.query.page || !req.query.pageSize){
      res.send(products);
    }else{
      const paginatedProducts = dataPagination(req.query.page as string, req.query.pageSize as string, products)
      res.send(paginatedProducts);
    }
  }catch(error){
    next(error);
  }
});

productsRouter.get("/inventory", async (req, res, next) => {
  try{
    const products = await productsService.findProductsInStock();
    if(!req.query.page || !req.query.pageSize){
    res.send(products);
    }else{
      const paginatedProducts = dataPagination(req.query.page as string, req.query.pageSize as string, products)
      res.send(paginatedProducts);
    }
  }catch(error){
    next(error);
  }
});

productsRouter.get("/out_of_stock", async (req, res, next) => {
  try{
    const products = await productsService.findProductsWithoutStock();
    if(!req.query.page || !req.query.pageSize){
      res.send(products);
      }else{
        const paginatedProducts = dataPagination(req.query.page as string, req.query.pageSize as string, products)
        res.send(paginatedProducts);
      }
  }catch(error){
    next(error);
  }
});

productsRouter.post("/create_product", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    if(!isNaN(+req.body.price)){
      if(!isNaN(+req.body.stock)){
        const price = parseFloat(req.body.price);
      const stock = parseInt(req.body.stock);
      const productDto = new ProductDto(req.body.name, req.body.description, price, stock, req.body.categoryId);
      const product = await productsService.createProduct(productDto);
      res.send(product);
      }else{
        throw Boom.badRequest('Stock must be a number');
      }
    }else{
      throw Boom.badRequest('Price must be a number');
    }
  }catch(error){
    next(error);
  }
});

productsRouter.patch("/:productId/change_name", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const name = req.body.name;
    const product = await productsService.updateProductName(productId, name);
    res.send(product);
  }catch(error){
    next(error);
  }
});

productsRouter.patch("/:productId/change_price", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    if(!isNaN(+req.body.price)){  const productId = req.params.productId;
      const price = parseFloat(req.body.price);
      const product = await productsService.updateProductPrice(productId, price);
      res.send(product);
    }else{
      throw Boom.badRequest('Price must be a number');
    }
  }catch(error){
    next(error);
  }
});

productsRouter.patch("/:productId/change_category", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const categoryId = req.body.categoryId;
    const product = await productsService.updateProductCategory(productId, categoryId);
    res.send(product);
  }catch(error){
    next(error);
  }
});

productsRouter.patch("/:productId/change_stock", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    if(!isNaN(+req.body.stock)){
        const productId = req.params.productId;
      const stock = parseInt(req.body.stock);
      const product = await productsService.updateProductStock(productId, stock);
      res.send(product);
    }else{
      throw Boom.badRequest('Stock must be a number');
    }
  }catch(error){
    next(error);
  }
});

productsRouter.patch("/:productId/change_description", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const description = req.body.description;
    const product = await productsService.updateProductDescription(productId, description);
    res.send(product);
  }catch(error){
    next(error);
  }
});

productsRouter.delete("/:productId", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const productId = req.params.productId;
    const product = await productsService.deleteProduct(productId);
    res.send(product);
  }catch(error){
    next(error);
  }
});


productsRouter.get("/:productId", async (req, res, next) => {
    try{
      const productId = req.params.productId;
      const product = await productsService.getProductById(productId);
      res.send(product);
    }catch(error){
      next(error);
    }
});
