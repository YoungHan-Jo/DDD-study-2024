import { NoOrderError } from '@src/shared/error';
import { OrderNumber } from '../../order/value/orderNumber';
import { OrderRepository } from '../../order/repository/orderRepository.interface';

export class CancelOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  cancel = (number: OrderNumber) => {
    const order = this.orderRepository.findByNumber(number);
    if (!order) {
      throw new NoOrderError({
        message: `No order found for number: ${number.getValue()}`,
      });
    }
    order.cancel();
  };
}
