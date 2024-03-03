import { OrderDto } from "../dto/orderDto";
import Boom from "@hapi/boom";
import { validateData } from "../middelware/dtoValidationMiddleware";
import { cancelOrderQuery, createOrderQuery, deleteOrderQuery, findAllOrdersQuery, findAllUserOrdersQuery, findOrderByIdQuery, findUserOrdersByStatusQuery, updateOrderStatusQuery } from "../prisma/queries/order queries/orderQueriesIndex";
import { userExists } from "./validation Funtions/userExists";
import { valdiateStatus } from "./validation Funtions/validateOrderStatus";

  export class OrderServices{

  async createOrder(orderDto: OrderDto){
    const validationResult = await validateData<OrderDto>(OrderDto, orderDto);
    if (validationResult.isValid) {
      if(await userExists(orderDto.userId)){
        const order = validationResult.validatedData;
        const validOrder = await createOrderQuery(order as OrderDto);
        return validOrder;
      }else{
        throw Boom.badData('User does not exist');
      }
    } else {
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

  async getOrderById(id: string){
    const order = await findOrderByIdQuery(id);
    if (order) {
      return order;
    } else {
      throw Boom.notFound('Order not found');
    }
  }

  async getAllOrders(){
    const orders = await findAllOrdersQuery();
    if (orders) {
      return orders;
    } else {
      throw Boom.notFound("Orders not found");
    }
  }

  async getAllUserOrders(userId: string){
    if(await userExists(userId)){
      const orders = await findAllUserOrdersQuery(userId);
      if (orders) {
        return orders;
      } else {
        throw Boom.notFound('Order not found');
      }
    }else{
      throw Boom.notFound('User does not exist');
    }
  }

  async getUserOrdersByStatus(userId: string, status: string){
    if(valdiateStatus(status)){
      if(await userExists(userId)){
        const orders = await findUserOrdersByStatusQuery(userId, status);
        if (orders) {
          return orders;
        } else {
            throw Boom.notFound("Orders not found");
        }
      }else{
        throw Boom.notFound('User does not exist');
      }
    }else{
      throw Boom.badData('Invalid status');
    }
  }

  async updateOrderStatus(id: string, status: string){
    if(status === "cancelled"){
      return this.cancelOrder(id);
    }else{
      if(valdiateStatus(status)){
        const order = await findOrderByIdQuery(id);
        if (order) {
          if(order.status === 'cancelled'){
            throw Boom.badRequest('Order cancelled, cannot update status');
          }else{
            return await updateOrderStatusQuery(id, status);
          }
        } else {
          throw Boom.notFound('Order not found');
        }
      }else{
        throw Boom.badData('Invalid status');
      }
    }
  }

  async cancelOrder(id: string){
   const order = await cancelOrderQuery(id);
    if (order) {
      return order;
    } else {
      throw Boom.notFound('Order not found');
  }
  }

  async deleteOrder(id: string){
    const order = await deleteOrderQuery(id);
    if (order) {
      return order;
    } else {
      throw Boom.notFound('Order not found');
    }
  }

  }
