import { Injectable } from '@nestjs/common';
import { RuleDiscounter } from './ruleDiscounter.interface';
import { NoCustomerError } from '@src/shared/error';
import { CustomerRepository } from '../../customer/customerRepository.interface';
import { OrderLine } from '../../order/value/orderLine';

@Injectable()
export class CalculateDiscountService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly ruleDiscounter: RuleDiscounter,
  ) {}

  calculateDiscount = (orderLines: OrderLine[], customerId: string) => {
    const customer = this.findCustomer(customerId);
    return this.ruleDiscounter.applyRules(customer, orderLines);
  };

  private findCustomer = (customerId: string) => {
    const foundCustomer = this.customerRepository.findById(customerId);
    if (!foundCustomer) {
      throw new NoCustomerError({
        message: `No customer found for id: ${customerId}`,
      });
    }
    return foundCustomer;
  };
}
