import { Order } from '../entity/order';
import { OrderId } from '../value/orderId';
import { OrderNumber } from '../value/orderNumber';

export interface OrderRepository {
  findById(id: OrderId): Order;
  findByNumber(number: OrderNumber): Order;
  save(order: Order): void;
  delete(order: Order): void;
}
