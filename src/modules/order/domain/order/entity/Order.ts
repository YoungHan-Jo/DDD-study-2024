import { Money } from 'src/shared/valueObject';
import { IllegalArgumentError } from 'src/shared/error';
import { IllegalStateError } from '@src/shared/error/illegalStateError';
import { randomUUID } from 'crypto';
import { Orderer } from '../value/orderer';
import { OrderLine } from '../orderLine';
import { ShippingInfo } from '../shippingInfo';
import { EOrderState } from '../orderState.enum';

export class Order {
  private orderNumber: string;
  private orderer: Orderer;
  private shippingInfo: ShippingInfo;
  private orderLines: OrderLine[];
  private totalAmounts: Money;
  private state: EOrderState;

  constructor({
    orderNumber,
    orderLines,
    shippingInfo,
    state = EOrderState.PAYMENT_WAITING,
  }: {
    orderNumber?: string;
    orderLines: OrderLine[];
    shippingInfo: ShippingInfo;
    state?: EOrderState;
  }) {
    this.setOrderLines(orderLines);
    this.setShippingInfo(shippingInfo);
    this.orderNumber = orderNumber ?? randomUUID();
    this.state = state;
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

  private setShippingInfo = (newShippingInfo: ShippingInfo) => {
    if (newShippingInfo === null || newShippingInfo === undefined) {
      throw new IllegalArgumentError({ message: 'no shippingInfo' });
    }
    // value 타입의 데이터를 변경할때는 새로운 객체로 교체
    this.shippingInfo = newShippingInfo;
  };

  private calculateTotalAmounts = () => {
    this.totalAmounts = this.orderLines.reduce((acc, orderLine) => {
      return acc.plus(orderLine.getAmounts());
    }, new Money(0));
  };

  getTotalAmounts = () => {
    return this.totalAmounts;
  };

  getShippingInfo = () => {
    return this.shippingInfo;
  };

  getState = () => {
    return this.state;
  };

  changeShipped = () => { };

  // 도메인 모델 엔티티는 도메인 기능도 함께 제공
  // 단순히 데이터를 담고 있는 데이터구조(DB 테이블)이 아닌 도메인 로직을 포함
  changeShippingInfo = (newShippingInfo: ShippingInfo) => {
    this.verifyNotYetShipped();
    this.setShippingInfo(newShippingInfo);
  };

  cancel = () => {
    this.verifyNotYetShipped();
    this.state = EOrderState.CANCELED;
  };

  private verifyNotYetShipped = () => {
    if (!this.state.isNotYetShipped()) {
      throw new IllegalStateError({ message: 'already shipped' });
    }
  };

  completePayment = () => { };
}
