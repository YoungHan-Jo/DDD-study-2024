import { Money } from '@src/shared/valueObject';
import { RuleDiscounter } from '../../domain/calculateDiscount/ruleDiscounter.interface';
import { Customer } from '../../domain/customer/customer';
import { OrderLine } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DroolsRuleDiscounter implements RuleDiscounter {
  private kContainer: KieContainer;

  constructor() {
    console.log('DroolsRuleDiscounter.constructor');
    this.kContainer = new KieContainer();
  }
  applyRules = (customer: Customer, orderLines: OrderLine[]) => {
    return orderLines.reduce((acc, orderLine) => {
      return acc.plus(orderLine.getAmounts());
    }, new Money(0));
  };
}

class KieContainer {
  constructor() {
    console.log('KieContainer.constructor');
  }
}
