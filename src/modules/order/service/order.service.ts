import { Injectable } from '@nestjs/common';
import { OrderLine } from '../domain';
import { CalculateDiscountService } from '../domain/service/calculateDiscount/calculateDiscount.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly calculateDiscountService: CalculateDiscountService,
  ) { }

  calculateDiscount = (orderLines: OrderLine[], customerId: string) => {
    return this.calculateDiscountService.calculateDiscount(
      orderLines,
      customerId,
    );
  };
}
