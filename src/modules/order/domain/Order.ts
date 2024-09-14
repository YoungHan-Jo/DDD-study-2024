import { Money } from 'src/shared/valueObject';
import { OrderLine } from './orderLine';
import { IllegalArgumentError } from 'src/shared/error';
import { ShippingInfo } from './shippingInfo';
import { EOrderState } from './orderState';
import { IllegalStateError } from '@src/shared/error/illegalStateError';

export class Order {
  private state: EOrderState;
  private orderLines: OrderLine[];
  private shippingInfo: ShippingInfo;
  private totalAmounts: Money;

  constructor({
    state,
    orderLines,
    shippingInfo,
  }: {
    state: EOrderState;
    orderLines: OrderLine[];
    shippingInfo: ShippingInfo;
  }) {
    this.state = state;
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

  getShippingInfo = () => {
    return this.shippingInfo;
  }

  changeShipped = () => { };

  changeShippingInfo = (newShippingInfo: ShippingInfo) => {
    this.verifyNotYetShipped();
    this.setShippingInfo(newShippingInfo);
  };

  cancel = () => {
    this.verifyNotYetShipped();
    this.state = EOrderState.CANCELED;
  };

  private verifyNotYetShipped = () => {
    if (this.state != EOrderState.PAYMENT_WAITING && this.state != EOrderState.PREPARING) {
      throw new IllegalStateError({ message: 'already shipped' });
    }
  }

  completePayment = () => { };
}
