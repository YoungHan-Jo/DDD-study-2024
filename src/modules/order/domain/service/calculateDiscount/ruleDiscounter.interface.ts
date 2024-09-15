import { Money } from '@src/shared/valueObject';
import { Customer } from '../../customer/customer';
import { OrderLine } from '../../order/value/orderLine';

export interface RuleDiscounter {
  applyRules(customer: Customer, orderLines: OrderLine[]): Money;
}
