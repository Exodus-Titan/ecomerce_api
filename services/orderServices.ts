import { OrderDto } from "../dto/orderDto";
import Boom from "@hapi/boom";
import { validateData } from "../middelware/dtoValidationMiddleware";
import { cancelOrderQuery, createOrderQuery, deleteOrderQuery, findAllOrdersQuery, findAllUserOrdersQuery, findOrderByIdQuery, findUserOrdersByStatusQuery, updateOrderStatusQuery } from "../prisma/queries/order queries/orderQueriesIndex";
import { userExists } from "./validation Funtions/userExists";
import { valdiateStatus } from "./validation Funtions/validateOrderStatus";
import { StringDto } from "../dto/stringDto";

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

  async getOrderById(orderId: string){
    const orderIdDto = new StringDto(orderId);
    const validationResult = await validateData<StringDto>(StringDto, orderIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const order = await findOrderByIdQuery(data.string);
          if (order) {
            return order;
          } else {
            throw Boom.notFound('Order not found');
          }
      }else {
        throw Boom.badData('Order id not provided');
      }
    }else{
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

  async getAllOrders(){
    const orders = await findAllOrdersQuery();
    if (orders && orders.length > 0) {
      return orders;
    } else {
      throw Boom.notFound("No orders found");
    }
  }

  async getAllUserOrders(userId: string){
    const userIdDto = new StringDto(userId);
    const validationResult = await validateData(StringDto, userIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          if(await userExists(data.string)){
            const orders = await findAllUserOrdersQuery(data.string);
            if (orders && orders.length > 0) {
              return orders;
            } else {
              throw Boom.notFound('No orders found');
            }
        }else{
          throw Boom.notFound('User does not exist');
        }
      }else {
        throw Boom.badData('User id not provided');
      }
    }else{
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

  async getUserOrdersByStatus(userId: string, status: string){
    const userIdDto = new StringDto(userId);
    const statusDto = new StringDto(status);
    const validationUSerIdString = await validateData<StringDto>(StringDto, userIdDto);
    const validationStatusString = await validateData<StringDto>(StringDto, statusDto);
    if (validationUSerIdString.isValid) {
      const validUserId = validationUSerIdString.validatedData;
      if (validUserId) {
        if (validationStatusString.isValid) {
          const validStatus = validationStatusString.validatedData;
          if (validStatus) {
            if(valdiateStatus(validStatus.string)){
              if(await userExists(validUserId.string)){
                const orders = await findUserOrdersByStatusQuery(validUserId.string, validStatus.string);
                if (orders && orders.length > 0) {
                  return orders;
                } else {
                    throw Boom.notFound("No orders found");
                }
              }else{
                throw Boom.notFound('User does not exist');
              }
            }else{
              throw Boom.badData('Invalid status');
            }
          }else{
            throw Boom.badData('Status not provided');
          }
        }else{
          throw Boom.badData(validationStatusString.errors?.[0]);
        }
      }else{
        throw Boom.badData('UserId not provided');
      }
    }else{
    throw Boom.badData(validationUSerIdString.errors?.[0]);
    }
  }

  async updateOrderStatus(userId: string, status: string){
    const userIdDto = new StringDto(userId);
    const statusDto = new StringDto(status);
    const validationId = await validateData(StringDto, userIdDto);
    const validationstatus = await validateData(StringDto, statusDto);
    if (validationId.isValid) {
      const validId = validationId.validatedData;
      if (validId) {
        if (validationstatus.isValid) {
          const validStatus = validationstatus.validatedData;
          if (validStatus) {
            if(validStatus.string === "cancelled"){
              return this.cancelOrder(validId.string);
            }else{
              if(valdiateStatus(validStatus.string)){
                const order = await findOrderByIdQuery(validId.string);
                if (order) {
                  if(order.status === 'cancelled'){
                    throw Boom.badRequest('Order cancelled, cannot update status');
                  }else{
                    return await updateOrderStatusQuery(validId.string, validStatus.string);
                  }
                } else {
                  throw Boom.notFound('Order not found');
                }
              }else{
                throw Boom.badData('Invalid status');
              }
            }
          }else{
            throw Boom.badData('Status not provided');
          }
        }else{
          throw Boom.badData(validationstatus.errors?.[0]);
        }
      }else{
        throw Boom.badData('User id not provided');
      }
    }else{
      throw Boom.badData(validationId.errors?.[0]);
    }
  }

  async cancelOrder(orderId: string){
    const orderIdDto = new StringDto(orderId);
    const validationResult = await validateData(StringDto, orderIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
        const order = await cancelOrderQuery(data.string);
          if (order) {
           return order;
          }else {
            throw Boom.notFound('Order not found');
          }
        }else {
          throw Boom.badData('Order id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }

  //implemented but not used cancel order sets the status to cancelled but dont delete the order for it to be shown in the user history
  async deleteOrder(orderId: string){
    const orderIdDto = new StringDto(orderId);
    const validationResult = await validateData(StringDto, orderIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const order = await deleteOrderQuery(data.string);
          if (order) {
            return order;
          } else {
            throw Boom.notFound('Order not found');
          }
        }else {
          throw Boom.badData('Order id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
    }

  }
