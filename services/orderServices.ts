import { OrderDto } from "../dto/orderDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import { createOrderQuery, deleteOrderQuery, findAllOrdersQuery, findAllUserOrdersQuery, findOrderByIdQuery, findUserOrdersByStatusQuery, updateOrderStatusQuery } from "../prisma/queries/order queries/orderQueriesIndex";

export class OrderServices{

  async createOrder(orderDto: OrderDto){
    try{
      const validationResult = await validateData<OrderDto>(OrderDto, orderDto);
      if (validationResult.isValid) {
        const order = validationResult.validatedData;
        const validOrder = await createOrderQuery(order as OrderDto);
        return validOrder;
      } else {
        throw new Error(validationResult.errors?.[0]);
      }
    } catch (error) {
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getOrderById(id: string){
    try{
      const order = await findOrderByIdQuery(id);
      if (order) {
        return order;
      } else {
        throw new Error('Order not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getAllOrders(){
    try{
      const orders = await findAllOrdersQuery();
      if (orders) {
        return orders;
      } else {
        throw new Error('No orders found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }
  async getAllUserOrders(userId: string){
    try{
      const orders = await findAllUserOrdersQuery(userId);
      if (orders) {
        return orders;
      } else {
        throw new Error('No orders found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getUserOrdersByStatus(userId: string, status: string){
    try{
      const orders = await findUserOrdersByStatusQuery(userId, status);
      if (orders) {
        return orders;
      } else {
        throw new Error('No orders found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateOrderStatus(id: string, status: string){
    try{
      const order = await updateOrderStatusQuery(id, status);
      if (order) {
        return order;
      } else {
        throw new Error('Order not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async deleteOrder(id: string){
    try{
      const order = await deleteOrderQuery(id);
      if (order) {
        return order;
      } else {
        throw new Error('Order not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

}
