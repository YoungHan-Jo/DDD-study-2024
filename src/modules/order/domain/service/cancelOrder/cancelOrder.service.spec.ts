import { NoOrderError } from '@src/shared/error';
import { OrderRepository } from '../../order/repository/orderRepository.interface';
import { OrderNumber } from '../../order/value/orderNumber';
import { CancelOrderService } from './cancelOrder.service';

describe('cancelOrderService', () => {
  const stubRepo: OrderRepository = {
    findByNumber: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  it('If no order, throw NoOrderError', () => {
    // Given
    (stubRepo.findByNumber as jest.Mock).mockReturnValue(null);

    const cancelOrderService = new CancelOrderService(stubRepo);
    // When & Then
    expect(() => {
      cancelOrderService.cancel(new OrderNumber('noOrderNumber'));
    }).toThrow(NoOrderError);
  });
});
