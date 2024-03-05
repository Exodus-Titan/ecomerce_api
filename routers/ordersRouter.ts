import express from "express";
import { OrderServices } from "../services/orderServices";
import { OrderDto } from "../dto/orderDto";
import passport from "passport";
import { checkAdminRole, checkIdMatch } from "../middelware/authHandler";
import { dataPagination } from "../middelware/pagination";

const orderServices = new OrderServices();
export const ordersRouter = express.Router();

ordersRouter.get("/", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const orders = await orderServices.getAllOrders();
    if(!req.query.page || !req.query.pageSize){
      res.send(orders);
      }else{
        const paginatedOrders = dataPagination(req.query.page as string, req.query.pageSize as string, orders)
        res.send(paginatedOrders);
      }
  }catch(error){
    next(error)
  }
});

ordersRouter.get("/:userId/status", passport.authenticate('jwt', {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const status = req.body.status;
    const orders = await orderServices.getUserOrdersByStatus(userId, status);
    if(!req.query.page || !req.query.pageSize){
      res.send(orders);
      }else{
        const paginatedOrders = dataPagination(req.query.page as string, req.query.pageSize as string, orders)
        res.send(paginatedOrders);
      }
  }catch(error){
    next(error)
  }
});

ordersRouter.post("/:userId/create_order", passport.authenticate('jwt', {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const orderDto = new OrderDto(req.body.orderedProducts, req.params.userId);
    const order = await orderServices.createOrder(orderDto);
    res.send(order);
  }catch(error){
    next(error)
  }
});

ordersRouter.patch("/:orderId/update_status", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const orderId = req.params.orderId;
    const status = req.body.status;
    const order = await orderServices.updateOrderStatus(orderId, status);
    res.send(order);
  }catch(error){
    next(error)
  }
});

ordersRouter.patch("/:userId/user_cancel", passport.authenticate('jwt', {session: false}), checkIdMatch,async (req, res, next) => {
  try{
    const orderId = req.body.orderId;
    const order = await orderServices.cancelOrder(orderId);
    res.send(order);
  }catch(error){
    next(error)
  }
});

ordersRouter.patch("/:orderId/admin_cancel", passport.authenticate('jwt', {session: false}), checkAdminRole,async (req, res, next) => {
  try{
    const orderId = req.params.orderId;
    const order = await orderServices.cancelOrder(orderId);
    res.send(order);
  }catch(error){
    next(error)
  }
});


ordersRouter.get("/:orderId", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const orderId = req.params.orderId;
    const order = await orderServices.getOrderById(orderId);
    res.send(order);
  }catch(error){
    next(error)
  }
});

ordersRouter.get("/:userId/orders", passport.authenticate('jwt', {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const orders = await orderServices.getAllUserOrders(userId);
    if(!req.query.page || !req.query.pageSize){
      res.send(orders);
      }else{
        const paginatedOrders = dataPagination(req.query.page as string, req.query.pageSize as string, orders)
        res.send(paginatedOrders);
      }
  }catch(error){
    next(error)
  }
});

/*
ordersRouter.delete("/:orderId", async (req, res, next) => {
  try{
    const orderId = req.params.orderId;
    const deletedOrder = await orderServices.deleteOrder(orderId);
    res.send(deletedOrder);
  }catch(error){
    next(error)
  }
});*/
