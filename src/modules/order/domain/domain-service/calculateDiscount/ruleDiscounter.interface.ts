import { Money } from '@src/shared/valueObject';
import { OrderLine } from '..';
import { Customer } from '../customer/customer';

export interface RuleDiscounter {
  applyRules(customer: Customer, orderLines: OrderLine[]): Money;
}
