import { Money } from 'src/shared/valueObject';
import { OrderLine } from './orderLine';
import { IllegalArgumentError } from 'src/shared/error';

export class Order {
  private orderLines: OrderLine[];
  private totalAmounts: Money;

  constructor({ orderLines }: { orderLines: OrderLine[] }) {
    this.setOrderLines(orderLines);
  }

  private setOrderLines = (orderLines: OrderLine[]) => {
    this.verifyAtLeastOneOrMoreOrderLines(orderLines);
    this.orderLines = orderLines;
    this.calculateTotalAmounts();
  };

  private verifyAtLeastOneOrMoreOrderLines = (orderLines: OrderLine[]) => {
    if (orderLines.length === 0) {
      throw new IllegalArgumentError({ message: 'no OrderLine' });
    }
  };

  private calculateTotalAmounts = () => {
    const sum = this.orderLines.reduce((acc, orderLine) => {
      return acc + orderLine.getAmounts();
    }, 0);
    this.totalAmounts = new Money(sum);
  };

  getTotalAmounts = () => {
    return this.totalAmounts;
  };

  changeShipped = () => {};

  changeShippingInfo = () => {};

  cancel = () => {};

  completePayment = () => {};
}
