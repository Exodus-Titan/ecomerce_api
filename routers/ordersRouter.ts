import express from "express";

export const ordersRouter = express.Router();

ordersRouter.get("/orderId", (req, res) => {
  //get order by id endpoint
});

ordersRouter.get("/", (req, res) => {
  //get orders by user endpoint
});

ordersRouter.get("/status", (req, res) => {
  //get orders by status endpoint
});

ordersRouter.post("/create_order", (req, res) => {
  //create order endpoint
});

ordersRouter.patch("/:orderId/cancel", (req, res) => {
  //cancel order endpoint
});

ordersRouter.delete("/:orderId", (req, res) => {
  //delete order endpoint
});
