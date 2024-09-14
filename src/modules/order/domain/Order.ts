import { Money } from 'src/shared/valueObject';
import { OrderLine } from './orderLine';
import { IllegalArgumentError } from 'src/shared/error';
import { ShippingInfo } from './shippingInfo';

export class Order {
  private orderLines: OrderLine[];
  private shippingInfo: ShippingInfo;
  private totalAmounts: Money;

  constructor({
    orderLines,
    shippingInfo,
  }: {
    orderLines: OrderLine[];
    shippingInfo: ShippingInfo;
  }) {
    this.setOrderLines(orderLines);
    this.setShippingInfo(shippingInfo);
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

  private setShippingInfo = (shippingInfo: ShippingInfo) => {
    if (shippingInfo === null || shippingInfo === undefined) {
      throw new IllegalArgumentError({ message: 'no shippingInfo' });
    }
    this.shippingInfo = shippingInfo;
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
