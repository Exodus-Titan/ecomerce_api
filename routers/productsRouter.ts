import express from "express";

export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    //get all products endpoint
});

productsRouter.get("/:productId", (req, res) => {
    //get product by id endpoint
});

productsRouter.get("/:name", (req, res) => {
  //get product by name endpoint
});

productsRouter.get("/:categoryId", (req, res) => {
  //get products by categories endpoint
});

productsRouter.get("/inventory", (req, res) => {
  //get products in stock endpoint
});

productsRouter.get("/out_of_stock", (req, res) => {
  //get products out of stock endpoint
});

productsRouter.post("/create_product", (req, res) => {
    //create product endpoint
});

productsRouter.patch("/:productId/change_name", (req, res) => {
  //change name endpoint
});

productsRouter.patch("/:productId/change_price", (req, res) => {
  //change price endpoint
});

productsRouter.patch("/:productId/change_category", (req, res) => {
  //change category endpoint
});

productsRouter.patch("/:productId/change_stock", (req, res) => {
  //change stock endpoint
});

productsRouter.patch("/:productId/change_description", (req, res) => {
  //change description endpoint
});

productsRouter.delete("/:productId", (req, res) => {
  //delete product endpoint
});

