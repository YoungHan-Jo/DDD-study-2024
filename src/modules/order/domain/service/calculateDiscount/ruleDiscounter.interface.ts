import { Money } from '@src/shared/valueObject';
import { Customer } from '../../customer/customer';
import { OrderLine } from '../../order/orderLine';

export interface RuleDiscounter {
  applyRules(customer: Customer, orderLines: OrderLine[]): Money;
}
