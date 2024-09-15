import { Order } from "../entity/order";
import { OrderNumber } from "../value/orderNumber";

export interface OrderRepository {
    findByNumber(number: OrderNumber): Order;
    save(order: Order): void;
    delete(order: Order): void;
}