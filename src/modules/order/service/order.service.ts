import { Injectable } from '@nestjs/common';
import { CalculateDiscountService } from '../domain/calculateDiscount/calculateDiscountService';
import { OrderLine } from '../domain';

@Injectable()
export class OrderService {
  constructor(
    private readonly calculateDiscountService: CalculateDiscountService,
  ) {}

  calculateDiscount = (orderLines: OrderLine[], customerId: string) => {
    return this.calculateDiscountService.calculateDiscount(
      orderLines,
      customerId,
    );
  };
}
